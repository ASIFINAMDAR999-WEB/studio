
'use client';

import { useState, useEffect } from 'react';
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { PT_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Loader } from '@/components/loader';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

// export const metadata: Metadata = {
//   title: 'CallCraft',
//   description: 'Your Ultimate Calling Solution',
// };

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
    <html lang="en" className={`${ptSans.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <title>CallCraft - Your Ultimate Calling Solution</title>
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
