
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="text-center py-20 md:py-32 overflow-hidden">
      <div className="container px-4 sm:px-6 animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-text-gradient bg-[200%_auto] [animation-play-state:running] hover:[animation-play-state:paused] animate-float">
          Find Your Perfect Spoofing Plan
        </h1>
        <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
          Unlock top-tier features with our world-class plans. Browse our plans to find the best fit for you.
        </p>
        <div className="mt-8 animate-fade-in-up [animation-delay:400ms]">
          <Button size="lg" asChild className="animate-press">
            <Link href="#pricing">View Plans <ArrowDown className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
