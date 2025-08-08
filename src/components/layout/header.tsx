"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Shield } from 'lucide-react';
import { NavLinks } from '@/components/layout/nav-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState, useEffect } from 'react';

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
           <Shield className="h-7 w-7 text-primary" />
          <div style={{ transform: 'translateZ(0)' }}>
            <span className="text-xl font-bold font-headline text-foreground">
              REDArmor v0.2
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
           <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <span className="sr-only">Toggle Menu</span>
                {mounted && (isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />)}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background/95 backdrop-blur-sm">
              <SheetHeader>
                 <Link href="/" className="flex items-center gap-3 mb-4" onClick={() => setIsMenuOpen(false)}>
                    <Shield className="h-7 w-7 text-primary" />
                     <span className="text-xl font-bold font-headline text-foreground">
                        REDArmor v0.2
                     </span>
                 </Link>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-4 text-lg">
                <NavLinks onLinkClick={() => setIsMenuOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
