
import { NextResponse } from 'next/server';
import axios from 'axios';

const OXAPAY_API_URL = 'https://api.oxapay.com/merchants/request';

export async function POST(request: Request) {
  const { amount, description } = await request.json();
  const merchantKey = process.env.OXAPAY_MERCHANT_KEY;

  if (!merchantKey) {
    console.error('OxaPay Merchant Key is not configured. Please add OXAPAY_MERCHANT_KEY to your .env.local file.');
    return NextResponse.json({ 
        error: 'Payment provider is not configured. Please contact support.' 
    }, { status: 500 });
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

    if (response.data && response.data.result === 100) { // OxaPay uses 100 for success
      return NextResponse.json({
        payLink: response.data.payLink,
        trackId: response.data.trackId,
      });
    } else {
      console.error('OxaPay API Error:', response.data.message);
      return NextResponse.json({ error: response.data.message || 'Failed to create OxaPay invoice.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error creating OxaPay invoice:', error.message);
    return NextResponse.json({ error: 'An internal server error occurred while contacting the payment provider.' }, { status: 500 });
  }
}
