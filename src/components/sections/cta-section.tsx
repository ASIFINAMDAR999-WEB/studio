
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Video, User } from 'lucide-react';

export function CtaSection() {
  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        <Card className="bg-primary text-primary-foreground shadow-xl animate-fade-in-up">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-primary-foreground/80 mt-2">Join our community, watch demos, or contact support directly.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Button asChild size="lg" className="text-lg py-7 px-10" variant="secondary">
                    <a href="https://t.me/+Eg-SFpyzbpM0YzM1" target="_blank" rel="noopener noreferrer">
                        Join Telegram
                        <Send className="ml-2 h-5 w-5" />
                    </a>
                </Button>
                 <Button asChild size="lg" className="text-lg py-7 px-10" variant="secondary">
                    <a href="https://t.me/+Eg-SFpyzbpM0YzM1" target="_blank" rel="noopener noreferrer">
                        Watch Demos
                        <Video className="ml-2 h-5 w-5" />
                    </a>
                </Button>
                 <Button asChild size="lg" className="text-lg py-7 px-10" variant="secondary">
                    <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">
                        Contact Admin
                        <User className="ml-2 h-5 w-5" />
                    </a>
                </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
