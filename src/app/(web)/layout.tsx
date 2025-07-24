
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import ClientLayout from './client-layout';
import '../globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'REDArmor v0.2 | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK',
  description: 'Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. REDArmor v0.2 – #1 spoof call top-up store.',
  openGraph: {
    type: 'website',
    url: 'https://callspoofing.shop/',
    title: 'REDArmor v0.2 | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK',
    description: 'Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. REDArmor v0.2 – #1 spoof call top-up store.',
    images: [{ url: 'https://callspoofing.shop/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REDArmor v0.2 | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK',
    description: 'Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. REDArmor v0.2 – #1 spoof call top-up store.',
    images: ['https://callspoofing.shop/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#673AB7" />
      </head>
      <body className="font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
