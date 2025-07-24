
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Loader } from '@/components/loader';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={`${montserrat.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>REDArmor v0.2 | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK</title>
        <meta name="description" content="Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. REDArmor v0.2 – #1 spoof call top-up store." />
        <meta name="theme-color" content="#673AB7" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://callspoofing.shop/" />
        <meta property="og:title" content="REDArmor v0.2 | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK" />
        <meta property="og:description" content="Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. REDArmor v0.2 – #1 spoof call top-up store." />
        <meta property="og:image" content="https://callspoofing.shop/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://callspoofing.shop/" />
        <meta property="twitter:title" content="REDArmor v0.2 | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK" />
        <meta property="twitter:description" content="Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. REDArmor v0.2 – #1 spoof call top-up store." />
        <meta property="twitter:image" content="https://callspoofing.shop/twitter-image.jpg" />

      </head>
      <body className="font-body antialiased">
        {loading ? (
          <Loader />
        ) : (
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div>
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
