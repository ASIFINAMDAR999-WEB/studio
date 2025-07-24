
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown, Send, Video } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="hero" className="relative text-center py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[80vh] bg-background">
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(103, 58, 183, 0.15), transparent 80%)`,
          animation: 'beam-pulse 4s infinite linear'
        }}
      />
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
       <div className="container px-4 sm:px-6 animate-fade-in-up relative z-10 animate-float">
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-gradient bg-[200%_auto] relative">
            Find Your Perfect Spoofing Plan
          </h1>
        </div>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
          Unlock top-tier features with our world-class plans. Browse our plans to find the best fit for you.
        </p>
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="text-lg py-6 px-8 animate-press">
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
