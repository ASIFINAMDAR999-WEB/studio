
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative text-center py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[80vh] bg-background">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-60"></div>
       <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
       
       <div className="container px-4 sm:px-6 animate-fade-in-up relative z-10">
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary-foreground bg-clip-text text-transparent animate-text-gradient bg-[200%_auto] relative">
            Find Your Perfect Spoofing Plan
          </h1>
        </div>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
          Unlock top-tier features with our world-class plans. Browse our plans to find the best fit for you.
        </p>
        <div className="mt-10">
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

