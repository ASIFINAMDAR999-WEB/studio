
import { PlanCard } from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, Bitcoin, Gauge, LifeBuoy, Lock } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { plans, faqItems } from '@/lib/data';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />

      <main className="flex-1">
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

        <section id="features" className="py-20 md:py-28 bg-card">
          <div className="container px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
              <p className="mt-4 text-muted-foreground">
                We provide a robust set of features to ensure you have the best experience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center p-4 animate-stagger-item" style={{'--stagger-index': 1} as React.CSSProperties}>
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 group">
                  <Lock className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Encrypted & Secure</h3>
                <p className="text-muted-foreground">Your privacy is our priority. All communications are fully encrypted.</p>
              </div>
              <div className="text-center p-4 animate-stagger-item" style={{'--stagger-index': 2} as React.CSSProperties}>
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 group">
                   <Gauge className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast and Effective</h3>
                <p className="text-muted-foreground">Our powerful infrastructure ensures your calls connect instantly.</p>
              </div>
              <div className="text-center p-4 animate-stagger-item" style={{'--stagger-index': 3} as React.CSSProperties}>
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 group">
                   <Bitcoin className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Crypto Payments</h3>
                <p className="text-muted-foreground">We accept various cryptocurrencies for anonymous and secure payments.</p>
              </div>
              <div className="text-center p-4 animate-stagger-item" style={{'--stagger-index': 4} as React.CSSProperties}>
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4 group">
                   <LifeBuoy className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Live Support</h3>
                <p className="text-muted-foreground">Our dedicated support team is always here to help you out.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
               <h2 className="text-3xl md:text-4xl font-bold">Our Plans</h2>
               <p className="mt-4 text-muted-foreground">
                  Choose the plan that's right for you. All plans come with our top-notch features and support.
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
              {plans.map((plan, i) => (
                <div key={plan.name} className="animate-stagger-item" style={{'--stagger-index': i + 1} as React.CSSProperties}>
                    <PlanCard plan={plan} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="testimonial" className="py-20 md:py-28 bg-card">
           <div className="container px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
                 <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
              </div>
              <Card className="max-w-2xl mx-auto shadow-lg bg-background animate-fade-in-up [animation-delay:200ms]">
                 <CardContent className="pt-6">
                    <p className="text-lg italic text-center text-muted-foreground">
                       "The best service for spoofing calls. The voice changer is amazing and the connection is always stable. Highly recommended for anyone looking for privacy and features!"
                    </p>
                    <div className="flex items-center justify-center mt-6">
                        <Avatar>
                           <AvatarImage src="https://placehold.co/40x40.png" alt="@johndoe" data-ai-hint="man" />
                           <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 text-left">
                           <p className="font-semibold">John Doe</p>
                           <p className="text-sm text-muted-foreground">Freelancer</p>
                        </div>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </section>

        <section id="faq" className="py-20 md:py-28">
           <div className="container px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
                  <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
                  <p className="mt-4 text-muted-foreground">
                     Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                  </p>
              </div>
              <div className="max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms]">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index+1}`} key={index}>
                      <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
           </div>
        </section>

        <section id="cta" className="py-20 md:py-28">
          <div className="container px-4 sm:px-6">
            <Card className="bg-primary text-primary-foreground shadow-xl animate-fade-in-up">
              <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                  <h2 className="text-3xl font-bold">Ready to Start?</h2>
                  <p className="text-primary-foreground/80 mt-2">Get the best spoofing service on the market today!</p>
                </div>
                <Button variant="destructive" size="lg" asChild className="text-lg py-6 px-10 animate-press">
                  <Link href="#pricing">Get Started Now</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
