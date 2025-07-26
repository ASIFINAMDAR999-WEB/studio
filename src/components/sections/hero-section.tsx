
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative text-center py-28 md:py-32 overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[80vh] bg-background">
      <div 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-50"
        style={{
          background: `radial-gradient(600px circle at center, hsl(var(--primary) / 0.15), transparent 80%)`,
        }}
      />
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
       <div className="container px-4 sm:px-6 animate-fade-in-up relative z-10">
        <div className="relative inline-block animate-float">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-primary dark:to-accent animate-text-gradient bg-[200%_auto] relative">
            Find Your Perfect Spoofing Plan
          </h1>
        </div>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
          Unlock top-tier features with our world-class spoof call plans. Browse our plans to find the best fit for you.
        </p>
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="text-lg py-6 px-8">
                <Link href="#pricing">
                    View Plans
                    <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
