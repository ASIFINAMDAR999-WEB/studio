'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from "@/components/ui/toaster";
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useState, useEffect } from 'react';
import { Loader } from '@/components/loader';

export function Providers({ children }: ThemeProviderProps) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1800); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {showLoader && <Loader />}
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
