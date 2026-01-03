
import { NextResponse } from 'next/server';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // in ms

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiIds = searchParams.get('ids');

  if (!apiIds) {
    return NextResponse.json({ error: 'No crypto IDs provided' }, { status: 400 });
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${apiIds}&vs_currencies=usd`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`CoinGecko API request failed with status ${response.status}`);
      }
      
      const data = await response.json();

      if (Object.keys(data).length === 0) {
        throw new Error("No prices returned from API.");
      }
      
      return NextResponse.json(data);

    } catch (error) {
      console.error(`Attempt ${attempt} to fetch crypto prices failed:`, error);
      if (attempt === MAX_RETRIES) {
        return NextResponse.json({ error: 'Failed to fetch crypto prices from CoinGecko API' }, { status: 502 });
      }
      await new Promise(res => setTimeout(res, RETRY_DELAY));
    }
  }

  // This part should be unreachable if MAX_RETRIES > 0
  return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
}
