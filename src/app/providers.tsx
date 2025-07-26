'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from "@/components/ui/toaster";
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function Providers({ children }: ThemeProviderProps) {
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
