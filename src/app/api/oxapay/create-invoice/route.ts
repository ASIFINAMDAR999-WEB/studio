
import { NextResponse } from 'next/server';
import axios from 'axios';

const OXAPAY_API_URL = 'https://api.oxapay.com/merchants/request';

export async function POST(request: Request) {
  const { amount, description } = await request.json();
  const merchantKey = process.env.OXAPAY_MERCHANT_KEY;

  if (!merchantKey) {
    console.error('OxaPay Merchant Key is not configured.');
    // For demonstration purposes, we will return a placeholder response.
    // In a real application, you should throw an error.
    return NextResponse.json({ 
        payLink: `https://www.oxapay.com/invoice/pay/TEST${Date.now()}`,
        trackId: `TEST-${Math.random().toString(36).substring(7)}`
    });
  }

  if (!amount || !description) {
    return NextResponse.json({ error: 'Amount and description are required' }, { status: 400 });
  }

  try {
    const response = await axios.post(OXAPAY_API_URL, {
      merchant: merchantKey,
      amount: amount,
      currency: 'USD',
      lifeTime: 30, // Invoice lifetime in minutes
      feePaidBy: 1, // 1 for merchant, 0 for user
      underPaidAccept: 1, // 1 for yes, 0 for no
      description: description,
      orderId: `REDArmor-${Date.now()}`,
      // callbackUrl: 'YOUR_SERVER_CALLBACK_URL',
      // successUrl: 'YOUR_SUCCESS_URL',
      // cancelUrl: 'YOUR_CANCEL_URL',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.result === 'success') {
      return NextResponse.json({
        payLink: response.data.payLink,
        trackId: response.data.trackId,
      });
    } else {
      console.error('OxaPay API Error:', response.data.message);
      return NextResponse.json({ error: response.data.message || 'Failed to create OxaPay invoice.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating OxaPay invoice:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
