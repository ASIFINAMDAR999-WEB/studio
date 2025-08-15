
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
  title: 'CallCraft | AI-Powered Plan Recommendations & Calling',
  description: 'Explore top-up plans for calling services with AI-powered recommendations. Connect with our demo channel and support on Telegram. Find the perfect plan for your needs.',
  openGraph: {
    type: 'website',
    url: 'https://callcraft.app/',
    title: 'CallCraft | AI-Powered Plan Recommendations & Calling',
    description: 'Explore top-up plans for calling services with AI-powered recommendations. Connect with our demo channel and support on Telegram. Find the perfect plan for your needs.',
    images: [{ url: 'https://callcraft.app/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CallCraft | AI-Powered Plan Recommendations & Calling',
    description: 'Explore top-up plans for calling services with AI-powered recommendations. Connect with our demo channel and support on Telegram. Find the perfect plan for your needs.',
    images: ['https://callcraft.app/twitter-image.png'],
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
