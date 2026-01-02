
import { NextResponse } from 'next/server';
import axios from 'axios';
import { addDoc, collection } from 'firebase-admin/firestore';
import { db } from '@/firebase/server'; // Assumes you have a server-side Firebase admin initialization

const OXAPAY_API_URL = 'https://api.oxapay.com/merchants/request';

export async function POST(request: Request) {
  const { amount, planName } = await request.json();
  const { OXAPAY_MERCHANT_KEY, NEXT_PUBLIC_BASE_URL } = process.env;

  // --- Environment Key Check ---
  console.log('--- Server Environment ---');
  console.log('Found OXAPAY_MERCHANT_KEY:', !!OXAPAY_MERCHANT_KEY);
  console.log('Found NEXT_PUBLIC_BASE_URL:', !!NEXT_PUBLIC_BASE_URL);
  
  if (!OXAPAY_MERCHANT_KEY) {
    console.error('[CRITICAL] OXAPAY_MERCHANT_KEY is NOT FOUND in process.env.');
    return NextResponse.json({ error: 'Payment provider is not configured. Please contact support.' }, { status: 500 });
  }
  
  if (!NEXT_PUBLIC_BASE_URL) {
    console.error('[CRITICAL] NEXT_PUBLIC_BASE_URL is NOT FOUND in process.env.');
    return NextResponse.json({ error: 'Application base URL is not configured. Please contact support.' }, { status: 500 });
  }

  if (!amount || !planName) {
    return NextResponse.json({ error: 'Amount and planName are required' }, { status: 400 });
  }

  let orderId;
  try {
    // 1. Create a PENDING order in Firestore before creating the invoice
    const orderRef = await addDoc(collection(db, 'orders'), {
      planName: planName,
      amount: amount,
      currency: 'USD',
      status: 'PENDING',
      createdAt: new Date(),
      paymentMethod: 'oxapay',
    });
    orderId = orderRef.id;
    console.log(`Created PENDING order with ID: ${orderId}`);

  } catch (dbError) {
    console.error('--- Firestore Order Creation Failed ---', dbError);
    return NextResponse.json({ error: 'Failed to initialize order. Please try again.' }, { status: 500 });
  }
  
  try {
    // 2. Create the OxaPay invoice using the Firestore document ID as orderId
    const callbackUrl = `${NEXT_PUBLIC_BASE_URL}/api/oxapay/webhook`;
    const successUrl = `${NEXT_PUBLIC_BASE_URL}/payment/success?orderId=${orderId}`;

    const response = await axios.post(OXAPAY_API_URL, {
      merchant: OXAPAY_MERCHANT_KEY,
      amount: amount,
      currency: 'USD',
      lifeTime: 30,
      feePaidBy: 1,
      underPaidAccept: 0, // Set to 0 to not accept underpayments automatically
      description: planName,
      orderId: orderId, // Use our internal order ID
      callbackUrl: callbackUrl,
      successUrl: successUrl,
      // cancelUrl: 'YOUR_CANCEL_URL',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.result === 100) {
      console.log(`Successfully created OxaPay invoice for order ${orderId}. Track ID:`, response.data.trackId);
      
      // Optionally, update the order with the trackId
      // await updateDoc(doc(db, 'orders', orderId), { oxapayTrackId: response.data.trackId });

      return NextResponse.json({
        payLink: response.data.payLink,
        trackId: response.data.trackId,
        orderId: orderId, // Return orderId to the client
      });
    } else {
      console.error('OxaPay API returned an error:', response.data.message || 'Unknown error from OxaPay');
      // If invoice creation fails, consider updating the order status to FAILED
      // await updateDoc(doc(db, 'orders', orderId), { status: 'FAILED' });
      return NextResponse.json({ error: response.data.message || 'Failed to create OxaPay invoice.' }, { status: 500 });
    }
  } catch (error: any) {
    const errorMsg = error.response ? JSON.stringify(error.response.data, null, 2) : error.message;
    console.error(`--- Full error creating OxaPay invoice for order ${orderId}: ---`, errorMsg);
    return NextResponse.json({ error: 'An internal server error occurred while contacting the payment provider.' }, { status: 500 });
  }
}
