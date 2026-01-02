import { NextResponse } from 'next/server';
import axios from 'axios';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/server';

const OXAPAY_TRANSACTION_INFO_URL = 'https://api.oxapay.com/merchants/inquiry';

/**
 * API Route to check the status of an OxaPay transaction and update the order in Firestore.
 * This serves as a manual verification fallback.
 */
export async function POST(request: Request) {
  const { trackId, orderId } = await request.json();

  if (!trackId || !orderId) {
    return NextResponse.json({ error: 'trackId and orderId are required' }, { status: 400 });
  }

  const { OXAPAY_MERCHANT_KEY: merchantKey } = process.env;
  if (!merchantKey) {
    console.error('[CRITICAL] OXAPAY_MERCHANT_KEY is not configured.');
    return NextResponse.json({ error: 'Payment provider configuration error.' }, { status: 500 });
  }

  try {
    // 1. Query OxaPay for the transaction details
    const inquiryResponse = await axios.post(OXAPAY_TRANSACTION_INFO_URL, {
      merchant: merchantKey,
      trackId: trackId,
    });

    const transaction = inquiryResponse.data;

    if (transaction.result !== 100) {
      return NextResponse.json({ success: false, status: 'api_error', message: transaction.message }, { status: 404 });
    }

    // 2. Get the corresponding order from Firestore
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      return NextResponse.json({ success: false, status: 'error', message: 'Order not found.' }, { status: 404 });
    }

    const orderData = orderDoc.data();
    
    // 3. Verify the transaction status and details
    if (transaction.status === 'Paid') {
      // Security Check: Verify amount and currency
      const isAmountMatching = parseFloat(transaction.amount) >= orderData.amount;
      const isCurrencyMatching = transaction.currency.toUpperCase() === orderData.currency.toUpperCase();
      
      if (isAmountMatching && isCurrencyMatching) {
        // Update order status to PAID if it's currently PENDING
        if (orderData.status === 'PENDING') {
          await updateDoc(orderRef, { status: 'PAID', paidAt: new Date() });
          return NextResponse.json({ success: true, status: 'PAID', message: 'Payment confirmed and order updated.' });
        } else if (orderData.status === 'PAID') {
          return NextResponse.json({ success: true, status: 'PAID', message: 'Payment was already confirmed.' });
        }
      } else {
        // Handle payment mismatch (e.g., underpayment)
        await updateDoc(orderRef, { status: 'MISMATCH', oxapayStatus: transaction.status });
        return NextResponse.json({ success: false, status: 'MISMATCH', message: 'Payment amount or currency mismatch.' });
      }
    }

    // If status is not 'Paid'
    return NextResponse.json({ success: true, status: transaction.status, message: `Payment status is: ${transaction.status}` });

  } catch (error: any) {
    console.error('Error checking OxaPay status:', error);
    return NextResponse.json({ error: 'An internal server error occurred while checking payment status.' }, { status: 500 });
  }
}
