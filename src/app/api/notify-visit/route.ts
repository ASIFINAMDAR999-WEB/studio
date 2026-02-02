
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { plans } from '@/lib/data';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Helper to parse user agent string
function parseUserAgent(userAgent: string) {
    let device = 'Desktop';
    if (/Mobi|Android/i.test(userAgent)) {
        device = 'Mobile';
    } else if (/Tablet|iPad/i.test(userAgent)) {
        device = 'Tablet';
    }

    let os = 'Unknown OS';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac OS X')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

    let browser = 'Unknown Browser';
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Edg')) browser = 'Edge';
    
    return { device, os, browser };
}


export async function POST(request: Request) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error("Telegram bot token or chat ID is not configured.");
        return NextResponse.json({ success: true, message: 'Notification skipped, server configuration missing.' });
    }

    try {
        const body = await request.json();
        const planName = body.planName || 'Not specified';
        const pageURL = body.pageURL || 'Not specified';

        // Find plan details
        const isTopUp = planName.includes('Silver Plan');
        const topUpAmount = isTopUp ? planName.split(' - ')[1] : null;
        const basePlanName = isTopUp ? planName.split(' - ')[0] : planName;
        const plan = plans.find((p) => p.name === basePlanName);

        let price = 'N/A';
        if (plan) {
            if (isTopUp && topUpAmount) {
                price = topUpAmount;
            } else {
                price = plan.priceString;
            }
        }
        const currency = 'USD';

        const headersList = headers();
        
        // Vercel-specific headers for geolocation and IP
        const ip = headersList.get('x-forwarded-for') ?? 'Not available';
        const country = headersList.get('x-vercel-ip-country') ?? 'N/A';
        const region = headersList.get('x-vercel-ip-country-region') ?? 'N/A';
        const city = headersList.get('x-vercel-ip-city') ?? 'N/A';
        
        const userAgent = headersList.get('user-agent') ?? 'Not available';
        const deviceInfo = parseUserAgent(userAgent);
        
        const timeOfVisit = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

        let message = `- - - - - - - - - - - - - - - - -\n`;
        message += `🔔 *New Payment Page Visit* 🔔\n`;
        message += `- - - - - - - - - - - - - - - - -\n\n`;

        message += `*Page Event:*\n`;
        message += `📖 *Page:* Payment\n`;
        message += `🔗 *URL:* ${pageURL}\n\n`;

        message += `*Selected Plan:*\n`;
        message += `📦 *Plan:* ${planName}\n`;
        message += `💰 *Price:* ${price} ${currency}\n\n`;

        message += `*Visitor Location:*\n`;
        message += `🌍 *Country:* ${country}\n`;
        message += `🏙️ *Region:* ${region}\n`;
        message += `📍 *City:* ${city}\n\n`;

        message += `*Network Info:*\n`;
        message += `💻 *IP Address:* \`${ip}\`\n\n`;

        message += `*Device Info:*\n`;
        message += `📱 *Device:* ${deviceInfo.device}\n`;
        message += `⚙️ *OS:* ${deviceInfo.os}\n`;
        message += `🌐 *Browser:* ${deviceInfo.browser}\n\n`;

        message += `*Visit Time:*\n`;
        message += `⏰ *Time (UTC):* ${timeOfVisit}\n`;
        message += `- - - - - - - - - - - - - - - - -`;

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
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Reseller Panel', url: 'https://www.callspoofing.shop/reseller' },
                            { text: 'Contact Support', url: 'https://t.me/CSG555' }
                        ]
                    ]
                }
            }),
        });

        const responseData = await response.json();

        if (!responseData.ok) {
            console.error('Failed to send Telegram notification:', responseData);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error in /api/notify-visit:', error);
        return NextResponse.json({ success: true, message: 'An internal error occurred while sending notification.' });
    }
}
