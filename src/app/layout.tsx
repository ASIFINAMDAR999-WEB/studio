
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Loader } from '@/components/loader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
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
    <html lang="en" className={`${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <title>CallCraft - Your Ultimate Calling Solution</title>
        <meta name="description" content="Your Ultimate Calling Solution" />
        <meta name="theme-color" content="#673AB7" />
      </head>
      <body className="font-body antialiased">
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js" strategy="beforeInteractive" />
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
