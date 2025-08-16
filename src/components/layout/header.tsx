"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Shield } from 'lucide-react';
import { NavLinks } from '@/components/layout/nav-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="py-4 px-4 sm:px-6 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40" style={{ willChange: 'transform' }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
           <Image src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-16_11-58-07-414.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE2XzExLTU4LTA3LTQxNC5wbmciLCJpYXQiOjE3NTUzMjYxMjUsImV4cCI6MjA3MDY4NjEyNX0.HrqwzcCFG0oUt0HEewn9XZC4jXJhrWc_sLq1YGqStqE" alt="REDArmor v0.2 Logo" width={40} height={40} />
          <div style={{ transform: 'translateZ(0)' }}>
            <span className="text-xl font-bold font-headline text-foreground">
              REDArmor v0.2
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-6 mr-4">
                <NavLinks />
            </nav>
           <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden ml-2">
                <div className="sr-only">Toggle Menu</div>
                {mounted && (isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />)}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-background/95 backdrop-blur-sm">
              <SheetHeader>
                 <Link href="/" className="flex items-center gap-3 mb-4" onClick={() => setIsMenuOpen(false)}>
                    <Image src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-16_11-58-07-414.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE2XzExLTU4LTA3LTQxNC5wbmciLCJpYXQiOjE3NTUzMjYxMjUsImV4cCI6MjA3MDY4NjEyNX0.HrqwzcCFG0oUt0HEewn9XZC4jXJhrWc_sLq1YGqStqE" alt="REDArmor v0.2 Logo" width={40} height={40} />
                     <span className="text-xl font-bold font-headline text-foreground">
                        REDArmor v0.2
                     </span>
                 </Link>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />
              <nav className="flex flex-col gap-2 text-lg">
                <NavLinks onLinkClick={() => setIsMenuOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
