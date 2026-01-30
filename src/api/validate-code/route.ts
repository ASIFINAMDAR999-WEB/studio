
import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// In a real-world scenario, these codes would be stored securely in a database.
// The key is the code the user enters, the value is the plan name.
const VALID_CODES: Record<string, string> = {
  'platinum:1111': 'Platinum Plan',
  'gold:2222': 'Gold Plan',
  'diamond:2222': 'Diamond Plan',
  'platinumpro:3333': 'Platinum Pro Plan',
  'custom:90': 'Platinum Plan (15 Days)',
};

async function verifyRecaptcha(token: string): Promise<{ success: boolean; 'error-codes'?: string[] }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("reCAPTCHA secret key is not set.");
    // In development, we can bypass. In production, this should be a fatal error.
    if (process.env.NODE_ENV === 'production') {
        throw new Error("reCAPTCHA secret key is not configured for production.");
    }
    console.warn("Bypassing reCAPTCHA verification in development.");
    return { success: true }; 
  }
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    if (!response.ok) {
        console.error(`reCAPTCHA verification failed with status: ${response.status}`);
        return { success: false, 'error-codes': ['recaptcha-request-failed'] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during reCAPTCHA verification request:", error);
    return { success: false, 'error-codes': ['recaptcha-network-error'] };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, recaptchaToken } = body;

    if (!code || typeof code !== 'string' || !recaptchaToken) {
      return NextResponse.json({ error: 'Missing or invalid code or reCAPTCHA token' }, { status: 400 });
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      console.warn('reCAPTCHA verification failed:', recaptchaResult['error-codes']);
      return NextResponse.json({ error: 'Invalid reCAPTCHA. Please try again.' }, { status: 400 });
    }

    const planName = VALID_CODES[code];

    if (planName) {
       if (code === 'custom:90') {
          return NextResponse.json({ success: true, custom: true, planName: planName, message: 'Custom plan unlocked!' });
      }
      return NextResponse.json({ success: true, planName });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid access code.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Unhandled error in /api/validate-code:', error);
    // Return a generic error to the client
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
