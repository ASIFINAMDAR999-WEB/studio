
import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RESELLER_ACCESS_CODE = process.env.RESELLER_ACCESS_CODE || 'reseller:5555';

async function verifyRecaptcha(token: string): Promise<{ success: boolean; 'error-codes'?: string[] }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("reCAPTCHA secret key is not set.");
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

    if (code === RESELLER_ACCESS_CODE) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid reseller access code.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Unhandled error in /api/validate-reseller-code:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
