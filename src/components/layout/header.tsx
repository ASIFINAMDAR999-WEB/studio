"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { NavLinks } from '@/components/layout/nav-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 px-4 sm:px-6 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <span className="text-xl font-bold text-foreground">REDArmor v0.2</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
           <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden relative h-9 w-9">
                <span className="sr-only">Toggle Menu</span>
                <Menu className={`absolute transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
                <X className={`absolute transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background/90 backdrop-blur-sm flex flex-col">
              <SheetHeader>
                 <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <span className="text-xl font-bold text-foreground">REDArmor v0.2</span>
                 </Link>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex-1">
                <nav className="flex flex-col gap-2 mt-4 text-lg">
                  <NavLinks onLinkClick={() => setIsMenuOpen(false)} />
                </nav>
              </div>
              <footer className="text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} REDArmor v0.2</p>
              </footer>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
