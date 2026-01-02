
import { NextResponse } from 'next/server';
import { db } from '@/firebase/server';

/**
 * API Route to handle OxaPay Webhook (Callback) notifications.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Log every incoming payload for debugging purposes
    console.log('--- OxaPay Webhook Received ---', JSON.stringify(payload, null, 2));

    const { status, orderId, amount, currency, trackId } = payload;

    // 1. Basic validation of the payload
    if (!status || !orderId || !amount || !currency || !trackId) {
      console.warn('Webhook payload missing required fields.');
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // 2. Check if the payment status is "Paid"
    if (status !== 'Paid') {
      console.log(`Webhook for order ${orderId} received with status: ${status}. No action taken.`);
      // Optionally handle other statuses like 'Unpaid', 'Underpaid', 'Overpaid'
      return NextResponse.json({ message: 'Webhook received, but status is not "Paid".' }, { status: 200 });
    }

    // 3. Get the corresponding order from Firestore
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      console.error(`Webhook Error: Order with ID ${orderId} not found in database.`);
      // Return 200 to prevent OxaPay from resending, but log the error.
      return NextResponse.json({ error: 'Order not found' }, { status: 200 });
    }

    const orderData = orderDoc.data();

    // 4. Idempotency Check: If order is already PAID, do nothing further.
    if (orderData?.status === 'PAID') {
      console.log(`Webhook for order ${orderId} ignored: Order is already marked as PAID.`);
      return NextResponse.json({ message: 'Order already processed.' }, { status: 200 });
    }

    // 5. Security Check: Verify that amount and currency match the order.
    // Use a small tolerance for floating point comparisons if necessary.
    const isAmountMatching = parseFloat(amount) >= (orderData?.amount || 0);
    const isCurrencyMatching = currency.toUpperCase() === (orderData?.currency.toUpperCase() || '');

    if (!isAmountMatching || !isCurrencyMatching) {
      console.error(`Webhook Security Alert: Mismatch for order ${orderId}.`);
      console.error(`Expected: ${orderData?.amount} ${orderData?.currency}, Received: ${amount} ${currency}`);
      // Update status to reflect mismatch and prevent activation
      await orderRef.update({ status: 'MISMATCH', oxapayStatus: 'Paid' });
      return NextResponse.json({ error: 'Payment data mismatch.' }, { status: 200 });
    }

    // 6. Update the order status to "PAID"
    await orderRef.update({ 
        status: 'PAID',
        paidAt: new Date(),
        oxapayTrackId: trackId,
    });

    console.log(`Successfully processed webhook for order ${orderId}. Status updated to PAID.`);

    // --- TODO: Trigger downstream actions here ---
    // For example, grant access code, send confirmation email, etc.
    // grantAccessCode(orderId, orderData.planName);

    // 7. Respond with HTTP 200 to acknowledge receipt
    return NextResponse.json({ message: 'Webhook processed successfully.' }, { status: 200 });

  } catch (error) {
    console.error('--- Unhandled Error in OxaPay Webhook ---', error);
    // Return a 500 error to indicate a problem on our side. OxaPay may retry.
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
