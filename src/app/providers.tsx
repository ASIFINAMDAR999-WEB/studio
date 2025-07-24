'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from "@/components/ui/toaster";
import { Loader } from '@/components/loader';

export function Providers({
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            {children}
          </div>
          <Toaster />
        </NextThemesProvider>
      )}
    </>
  );
}
