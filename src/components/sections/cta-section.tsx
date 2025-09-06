
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Video, User } from 'lucide-react';

export function CtaSection() {
  const ctaButtons = [
    {
      href: "/bots",
      label: "View Our Bots",
      icon: <Bot className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />,
      ariaLabel: "View our bots"
    },
    {
      href: "https://t.me/+Eg-SFpyzbpM0YzM1",
      label: "Watch Demos",
      icon: <Video className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />,
      ariaLabel: "Watch demos on Telegram",
      isExternal: true
    },
    {
      href: "https://t.me/AF3092",
      label: "Contact Admin",
      icon: <User className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
      ariaLabel: "Contact admin on Telegram",
      isExternal: true
    }
  ];

  return (
    <section id="cta" className="py-20 md:py-28" aria-labelledby="cta-heading">
      <div className="container px-4 sm:px-6">
        <Card className="bg-primary text-primary-foreground shadow-xl animate-fade-in-up overflow-hidden relative">
           <div className="absolute -top-1/4 -right-1/4 w-1/2 h-[150%] bg-primary-foreground/10 rounded-full blur-3xl opacity-50 animate-float" />
          <CardContent className="p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative z-10">
            <div className="flex-1">
              <h2 id="cta-heading" className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-primary-foreground/80 mt-2 max-w-xl mx-auto lg:mx-0">Explore our bots, watch demos, or contact support directly.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 flex-shrink-0">
              {ctaButtons.map((buttonInfo, index) => (
                <Button 
                  asChild 
                  key={index}
                  size="lg" 
                  className="text-lg py-7 px-8 group transition-all duration-300 transform-gpu hover:shadow-2xl hover:-translate-y-1" 
                  variant="secondary"
                >
                  {buttonInfo.isExternal ? (
                    <a href={buttonInfo.href} target="_blank" rel="noopener noreferrer" aria-label={buttonInfo.ariaLabel}>
                      {buttonInfo.label}
                      {buttonInfo.icon}
                    </a>
                  ) : (
                    <Link href={buttonInfo.href} aria-label={buttonInfo.ariaLabel}>
                      {buttonInfo.label}
                      {buttonInfo.icon}
                    </Link>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

    