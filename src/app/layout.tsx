
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
        <title>REDArmor v0.2 - Your Ultimate Calling Solution</title>
        <meta name="description" content="Your Ultimate Calling Solution" />
        <meta name="theme-color" content="#673AB7" />
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
