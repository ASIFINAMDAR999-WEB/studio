
"use client";

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from "@/components/ui/toaster";
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
