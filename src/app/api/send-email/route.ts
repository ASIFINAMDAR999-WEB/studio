
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { MailOptions } from 'nodemailer/lib/sendmail-transport';

const USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", "Mozilla/5.0 (X11; Linux x86_64)", "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)", "Mozilla/5.0 (iPad; CPU OS 13_6 like Mac OS X)", "Mozilla/5.0 (Linux; Android 10)", "Mozilla/5.0 (Windows NT 6.1; Win64; x64)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6)", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0)", "Mozilla/5.0 (Linux; Android 11; Pixel 4)", "Mozilla/5.0 (Windows NT 10.0; WOW64)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1)", "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X)", "Mozilla/5.0 (Linux; Android 9; SM-G960F)", "Mozilla/5.0 (Windows NT 5.1; rv:40.0)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_0)", "Mozilla/5.0 (Linux; Android 12; Pixel 5)", "Mozilla/5.0 (Windows NT 6.3; Win64; x64)", "Mozilla/5.0 (X11; Fedora; Linux x86_64)", "Mozilla/5.0 (Linux; Android 8.1.0; Nexus 6P)"
];

const REFERRERS = [
    "https://www.google.com", "https://www.facebook.com", "https://www.twitter.com", "https://www.linkedin.com", "https://www.yahoo.com", "https://www.bing.com", "https://www.reddit.com", "https://www.github.com", "https://www.medium.com", "https://www.stackoverflow.com", "https://news.ycombinator.com", "https://www.quora.com", "https://www.pinterest.com", "https://duckduckgo.com", "https://www.instagram.com", "https://www.tumblr.com", "https://www.wikiwand.com", "https://www.nytimes.com", "https://www.outlook.com", "https://www.office.com"
];

export async function POST(request: Request) {
    const formData = await request.formData();
    const fromName = formData.get('fromName') as string;
    const fromEmail = formData.get('fromEmail') as string;
    const toEmail = formData.get('toEmail') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const attachment = formData.get('attachment') as File | null;

    if (!toEmail || !fromEmail || !fromName || !subject || !message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { SMTP_EMAIL, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env;

    if (!SMTP_EMAIL || !SMTP_PASSWORD || !SMTP_HOST || !SMTP_PORT) {
        console.error('SMTP configuration is missing from environment variables.');
        return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        },
    });

    try {
        await transporter.verify();
    } catch (error) {
        console.error('SMTP transporter verification failed:', error);
        return NextResponse.json({ error: 'Failed to connect to email server.' }, { status: 500 });
    }

    const mailOptions: MailOptions = {
        from: `"${fromName}" <${SMTP_EMAIL}>`,
        to: toEmail,
        subject: subject,
        html: message.replace(/\n/g, '<br>'), // Convert newlines to breaks for HTML email
        replyTo: fromEmail,
        headers: {
            'X-User-Agent': USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
            'X-Referer': REFERRERS[Math.floor(Math.random() * REFERRERS.length)],
        }
    };

    if (attachment) {
        const buffer = Buffer.from(await attachment.arrayBuffer());
        mailOptions.attachments = [
            {
                filename: attachment.name,
                content: buffer,
                contentType: attachment.type,
            }
        ];
    }

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}
