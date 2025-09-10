
"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Video, User } from 'lucide-react';
import { NavLinks } from '@/components/layout/nav-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 px-4 sm:px-6 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40" style={{ willChange: 'transform' }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3" aria-label="Go to homepage">
           <Image src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-16_11-58-07-414.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE2XzExLTU4LTA3LTQxNC5wbmciLCJpYXQiOjE3NTUzMjYxMjUsImV4cCI6MjA3MDY4NjEyNX0.HrqwzcCFG0oUt0HEewn9XZC4jXJhrWc_sLq1YGqStqE" alt="REDArmor 2.0 Logo" width={50} height={50} className="h-10 w-10 sm:h-12 sm:w-12 transform-gpu" />
          <div className="transform-gpu">
            <span className="text-xl font-bold font-headline text-foreground">
              REDArmor 2.0
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
              <Button 
                variant="outline" 
                size="icon" 
                className="md:hidden ml-2 h-10 w-10 group"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Toggle Menu</span>
                <Menu className="h-6 w-6 absolute transition-all scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:-rotate-90" />
                <X className="h-6 w-6 absolute transition-all scale-0 rotate-90 group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              id="mobile-menu"
              side="right" 
              className="w-[85vw] max-w-xs bg-background/95 backdrop-blur-sm p-0 flex flex-col"
            >
               <div className="absolute inset-0 bg-grid-pattern-small opacity-20 dark:opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)] -z-10"></div>
              <SheetHeader className="p-6 pb-2">
                 <Link href="/" className="flex items-center gap-3 mb-4" onClick={() => setIsMenuOpen(false)} aria-label="Go to homepage">
                    <Image src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-16_11-58-07-414.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE2XzExLTU4LTA3LTQxNC5wbmciLCJpYXQiOjE3NTUzMjYxMjUsImV4cCI6MjA3MDY4NjEyNX0.HrqwzcCFG0oUt0HEewn9XZC4jXJhrWc_sLq1YGqStqE" alt="REDArmor 2.0 Logo" width={50} height={50} />
                     <span className="text-xl font-bold font-headline text-foreground">
                        REDArmor 2.0
                     </span>
                 </Link>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Separator />
              <nav className="flex-grow flex flex-col p-4 gap-2 text-lg overflow-y-auto">
                <NavLinks onLinkClick={() => setIsMenuOpen(false)} isMobile />
              </nav>
              <Separator />
              <div className="p-4 space-y-3">
                <Button asChild size="lg" className="w-full justify-start text-base group" variant="ghost">
                   <a href="https://t.me/+Eg-SFpyzbpM0YzM1" target="_blank" rel="noopener noreferrer" aria-label="Watch demos on Telegram" onClick={() => setIsMenuOpen(false)}>
                      <Video className="mr-3 h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
                      Watch Demos
                   </a>
                </Button>
                 <Button asChild size="lg" className="w-full justify-start text-base group" variant="ghost">
                    <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer" aria-label="Contact admin on Telegram" onClick={() => setIsMenuOpen(false)}>
                      <User className="mr-3 h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                      Contact Admin
                    </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
