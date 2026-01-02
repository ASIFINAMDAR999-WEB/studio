
import { NextResponse } from 'next/server';
import axios from 'axios';

const OXAPAY_API_URL = 'https://api.oxapay.com/merchants/request';

export async function POST(request: Request) {
  const { amount, description } = await request.json();
  
  // Directly destructure the key from process.env for robustness on Vercel.
  const { OXAPAY_MERCHANT_KEY: merchantKey } = process.env;

  // --- Enhanced Logging for Vercel Diagnosis ---
  console.log('--- OxaPay Invoice Creation ---');
  console.log('Checking for OXAPAY_MERCHANT_KEY...');
  
  if (!merchantKey) {
    console.error('[CRITICAL] OXAPAY_MERCHANT_KEY is NOT FOUND in process.env.');
    console.log('Please ensure the environment variable is set correctly in Vercel project settings and the project has been redeployed.');
    return NextResponse.json({ 
        error: 'Payment provider is not configured. Please contact support.' 
    }, { status: 500 });
  }

  console.log('OXAPAY_MERCHANT_KEY found. Proceeding to create invoice.');
  // For security, let's not log the key itself, but we can log a part of it to confirm it's the right one.
  console.log(`Merchant Key Hint: Starts with '${merchantKey.substring(0, 4)}...'`);


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
      // callbackUrl: 'YOUR_SERVER_CALLBACK_URL', // Important for automatic activation in the future
      // successUrl: 'YOUR_SUCCESS_URL',
      // cancelUrl: 'YOUR_CANCEL_URL',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.result === 100) { // OxaPay uses 100 for success
      console.log('Successfully created OxaPay invoice. Track ID:', response.data.trackId);
      return NextResponse.json({
        payLink: response.data.payLink,
        trackId: response.data.trackId,
      });
    } else {
      console.error('OxaPay API returned an error:', response.data.message || 'Unknown error from OxaPay');
      return NextResponse.json({ error: response.data.message || 'Failed to create OxaPay invoice.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('--- Full error creating OxaPay invoice: ---');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
    return NextResponse.json({ error: 'An internal server error occurred while contacting the payment provider.' }, { status: 500 });
  }
}
