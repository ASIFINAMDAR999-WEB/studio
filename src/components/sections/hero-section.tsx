
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { GlobeAnimation } from '@/components/globe-animation';

export function HeroSection() {
  return (
    <section id="hero" className="relative text-center py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[80vh]">
       <GlobeAnimation />
       <div className="container px-4 sm:px-6 animate-fade-in-up relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
          Find Your Perfect Spoofing Plan
        </h1>
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
