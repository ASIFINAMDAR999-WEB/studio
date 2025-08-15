
import type { Metadata } from 'next';
import { PT_Sans, Poppins } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

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

export const metadata: Metadata = {
  title: 'REDArmor v0.2 | Global Call Spoofing Service for USA, UK & Europe',
  description: 'Buy high-quality call spoofing plans with fake caller ID. Trusted service for clients in the USA, UK, and Europe. REDArmor v0.2 – the #1 call spoofing top-up store.',
  openGraph: {
    type: 'website',
    url: 'https://callspoofing.shop/',
    title: 'REDArmor v0.2 | Global Call Spoofing Service for USA, UK & Europe',
    description: 'Buy high-quality call spoofing plans with fake caller ID. Trusted service for clients in the USA, UK, and Europe. REDArmor v0.2 – the #1 call spoofing top-up store.',
    images: [{ url: 'https://callspoofing.shop/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REDArmor v0.2 | Global Call Spoofing Service for USA, UK & Europe',
    description: 'Buy high-quality call spoofing plans with fake caller ID. Trusted service for clients in the USA, UK, and Europe. REDArmor v0.2 – the #1 call spoofing top-up store.',
    images: ['https://callspoofing.shop/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#673AB7" />
      </head>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
