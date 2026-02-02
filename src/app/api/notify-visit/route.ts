
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error("Telegram bot token or chat ID is not configured.");
        // We don't want to block the user's payment page from loading
        // so we'll just log the error on the server and return a success response.
        return NextResponse.json({ success: true, message: 'Notification skipped, server configuration missing.' });
    }

    try {
        const headersList = headers();
        
        // Vercel-specific headers for geolocation and IP
        const ip = headersList.get('x-forwarded-for') ?? 'Not available';
        const country = headersList.get('x-vercel-ip-country') ?? 'Not available';
        const userAgent = headersList.get('user-agent') ?? 'Not available';

        const timeOfVisit = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

        let message = `🔔 *New Payment Page Visit* 🔔\n\n`;
        message += `*Country:* ${country}\n`;
        message += `*IP Address:* \`${ip}\`\n`;
        message += `*Device/Browser:* \`${userAgent}\`\n`;
        message += `*Time (UTC):* ${timeOfVisit}`;

        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            }),
        });

        const responseData = await response.json();

        if (!responseData.ok) {
            console.error('Failed to send Telegram notification:', responseData);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error in /api/notify-visit:', error);
        // Again, don't block the user experience, just log the error.
        return NextResponse.json({ success: true, message: 'An internal error occurred while sending notification.' });
    }
}
