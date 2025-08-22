
import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// In a real-world scenario, these codes would be stored securely in a database.
const VALID_CODES: Record<string, string> = {
  'platinum:1111': 'Platinum 1-Month',
  'gold:2222': 'Gold Plan',
  'diamond:2222': 'Diamond Plan',
  'platinum3m:4444': 'Platinum Plan',
};

async function verifyRecaptcha(token: string) {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("reCAPTCHA secret key is not set.");
    // For development purposes, if the key is not set, we can bypass verification.
    // In production, this should throw an error.
    return { success: true }; 
  }
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const data = await response.json();
  return data;
}

export async function POST(request: Request) {
  try {
    const { code, recaptchaToken } = await request.json();

    if (!code || !recaptchaToken) {
      return NextResponse.json({ error: 'Missing code or reCAPTCHA token' }, { status: 400 });
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      return NextResponse.json({ error: 'Invalid reCAPTCHA. Please try again.' }, { status: 400 });
    }

    const planName = VALID_CODES[code];

    if (planName) {
      return NextResponse.json({ success: true, planName });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid access code.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
