"use client";

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from "@/components/ui/toaster";
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useState, useEffect } from 'react';
import { Loader } from '@/components/loader';

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
