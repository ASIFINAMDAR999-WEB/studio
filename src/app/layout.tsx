
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
  title: 'REDArmor 2.0 | Secure Communication Services',
  description: 'Explore our secure call spoofing, voice changing, and communication services. Anonymity and privacy guaranteed.',
  openGraph: {
    type: 'website',
    url: 'https://redarmor.app/',
    title: 'REDArmor 2.0 | Secure Communication Services',
    description: 'Explore our secure call spoofing, voice changing, and communication services. Anonymity and privacy guaranteed.',
    images: [{ url: 'https://redarmor.app/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REDArmor 2.0 | Secure Communication Services',
    description: 'Explore our secure call spoofing, voice changing, and communication services. Anonymity and privacy guaranteed.',
    images: ['https://redarmor.app/twitter-image.png'],
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
