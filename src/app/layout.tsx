import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: 'CallCraft | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK',
  description: 'Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. CallCraft – #1 spoof call top-up store.',
  openGraph: {
    type: 'website',
    url: 'https://callspoofing.shop/',
    title: 'CallCraft | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK',
    description: 'Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. CallCraft – #1 spoof call top-up store.',
    images: [{ url: 'https://callspoofing.shop/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CallCraft | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK',
    description: 'Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. CallCraft – #1 spoof call top-up store.',
    images: ['https://callspoofing.shop/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSans.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#673AB7" />
      </head>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
