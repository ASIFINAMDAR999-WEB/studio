
import type { Metadata } from 'next';
import { PT_Sans, Poppins } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { WithContext, Organization } from 'schema-dts';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poppins',
});

const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'REDArmor 2.0',
  url: 'https://www.callspoofing.shop',
  logo: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-16_11-58-07-414.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE2XzExLTU4LTA3LTQxNC5wbmciLCJpYXQiOjE3NTUzMjYxMjUsImV4cCI6MjA3MDY4NjEyNX0.HrqwzcCFG0oUt0HEewn9XZC4jXJhrWc_sLq1YGqStqE',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://www.callspoofing.shop/contact',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://t.me/AF3092'
  ]
}

export const metadata: Metadata = {
  title: 'Call Spoofing | REDArmor 2.0',
  description: 'REDArmor 2.0 — global VOIP call provider offering advanced Call Spoofing, SIP trunking, IVR and DTMF. Secure, private, and reliable voice services worldwide.',
  alternates: {
    canonical: 'https://www.callspoofing.shop',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.callspoofing.shop',
    title: 'Call Spoofing | REDArmor 2.0',
    description: 'REDArmor 2.0 — global VOIP call provider offering advanced Call Spoofing, SIP trunking, IVR and DTMF. Secure, private, and reliable voice services worldwide.',
    images: [{ url: 'https://www.callspoofing.shop/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Call Spoofing | REDArmor 2.0',
    description: 'REDArmor 2.0 — global VOIP call provider offering advanced Call Spoofing, SIP trunking, IVR and DTMF. Secure, private, and reliable voice services worldwide.',
    images: ['https://www.callspoofing.shop/twitter-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSans.variable} ${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#601DE2" />
      </head>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
