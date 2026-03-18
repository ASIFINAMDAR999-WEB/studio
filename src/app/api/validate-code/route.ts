
import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Valid codes and their corresponding plan names.
const VALID_CODES: Record<string, string> = {
  'platinum:1111': 'Platinum Plan',
  'gold:2222': 'Gold Plan',
  'diamond:2222': 'Diamond Plan',
  'platinumpro:3333': 'Platinum Pro Plan',
  'platinum:15': 'Platinum Plan (15 Days)',
  'silver:topup': 'Silver Plan',
  'custom:90': 'Exclusive Offers',
};

async function verifyRecaptcha(token: string): Promise<{ success: boolean; 'error-codes'?: string[] }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("reCAPTCHA secret key is not set.");
    if (process.env.NODE_ENV === 'production') {
        throw new Error("reCAPTCHA secret key is not configured for production.");
    }
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
        return { success: false, 'error-codes': ['recaptcha-request-failed'] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
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
      return NextResponse.json({ error: 'Invalid reCAPTCHA. Please try again.' }, { status: 400 });
    }

    const planName = VALID_CODES[code];

    if (planName) {
       // Logic for unlocking custom/hidden sections
       if (code === 'platinum:15' || code === 'silver:topup' || code === 'custom:90') {
          return NextResponse.json({ 
            success: true, 
            custom: true, 
            unlockType: code === 'custom:90' ? 'all' : (code === 'platinum:15' ? 'platinum15' : 'silver'),
            message: 'Exclusive plans revealed!' 
          });
      }
      return NextResponse.json({ success: true, planName });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid access code.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Unhandled error in /api/validate-code:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
