
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        <Card className="bg-primary text-primary-foreground shadow-xl animate-fade-in-up">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold">Ready to Start?</h2>
              <p className="text-primary-foreground/80 mt-2">Get the best spoofing service on the market today!</p>
            </div>
            <Button variant="destructive" size="lg" asChild className="text-lg py-6 px-10 animate-press flex-shrink-0">
              <Link href="#pricing">Get Started Now</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
