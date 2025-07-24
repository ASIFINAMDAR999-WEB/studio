import { PlanCard } from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, ShieldCheck, Zap, KeyRound, Headphones, Menu } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const plans = [
  {
    name: 'Platinum 1 Month',
    priceString: '$100',
    duration: '/month',
    features: [
      'Full Call Spoofing',
      'Premium Voice Changer',
      'Enhanced Routing',
      'Priority Support',
      'Advance Otp bot Access',
      'Website & Application Access',
      'Email & SMS Spoofing Access',
      'IVR System',
      'Premium Toll-Free Number Spoofing',
      'Premium SIP Trunk Access',
    ],
    highlight: false,
    isHot: true,
    cta: 'Choose Plan',
    ctaLink: '#',
  },
  {
    name: 'Gold Plan',
    priceString: '$90',
    duration: '/month',
    features: [
      'Full Call Spoofing Access',
      'Standard Voice Changer',
      'Website & Application Access',
    ],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
    ctaLink: '#',
  },
  {
    name: 'Diamond Plan',
    priceString: '$200',
    duration: '/2 months',
    features: [
      'Advanced Call Spoofing',
      'Premium Voice Changer',
      'Enhanced Call Routing',
      'Advance Otp bot Access',
      'Website & Application Access',
      'Email & SMS Spoofing Access',
      'IVR System',
      'Toll-Free Number Spoofing',
      'SIP Trunk Access',
    ],
    highlight: true,
    isHot: false,
    cta: 'Choose Plan',
    ctaLink: '#',
  },
  {
    name: 'Platinum Plan',
    priceString: '$300',
    duration: '/3 months',
    features: [
      'Advanced Call Spoofing',
      'Premium Voice Changer',
      'Enhanced Routing',
      'Priority Support',
      'Advance Otp bot Access',
      'Full API & Custom Integration',
      'Website & Application Access',
      'Email & SMS Spoofing Access',
      'IVR System',
      'Premium Toll-Free Number Spoofing',
      'Premium SIP Trunk Access',
    ],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
    ctaLink: '#',
  },
  {
    name: 'Silver Plan Top-up',
    priceString: '$50-$500',
    duration: '',
    features: ["Manual top-up", "Only for virtual number's and esim"],
    highlight: false,
    isHot: false,
    cta: 'Choose Plan',
    ctaLink: '#',
  },
];

const faqItems = [
  {
    question: "What is call spoofing?",
    answer: "Call spoofing is a service that allows you to change the Caller ID to any number you want. It's useful for privacy, business, and pranking."
  },
  {
    question: "Is this service legal to use?",
    answer: "The legality depends on your location and how you use the service. It is your responsibility to use our services in compliance with all applicable laws. We do not condone any illegal activities."
  },
  {
    question: "How do I make a payment?",
    answer: "We accept various cryptocurrencies for payment. Once you select a plan, you will be guided through the secure payment process."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Please contact our support team to assist you with the process."
  },
  {
    question: "Do you offer a free trial?",
    answer: "We do not offer free trials due to the nature of the service. However, we have various plans to suit different budgets and needs."
  }
]

const NavLinks = () => (
  <>
    <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Features</Link>
    <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Pricing</Link>
    <Link href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">FAQ</Link>
    <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contact</Link>
  </>
);


export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="py-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">TELE-Spoof v.2</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="#">Login</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 mt-8">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="hero" className="text-center py-20 md:py-32">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Find Your Perfect<br/>Spoofing Plan
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
              We provide the best call spoofing services with a variety of plans to fit your needs. Secure, fast, and reliable.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="#pricing">See Plans</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-card">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
              <p className="mt-4 text-muted-foreground">
                We are trusted by thousands of users for our reliable and feature-rich spoofing services.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Encrypted & Secure</h3>
                <p className="text-muted-foreground">Your privacy is our priority. All communications are fully encrypted.</p>
              </div>
              <div className="text-center p-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                   <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast and Effective</h3>
                <p className="text-muted-foreground">Our powerful infrastructure ensures your calls connect instantly.</p>
              </div>
              <div className="text-center p-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                   <KeyRound className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Crypto Payments</h3>
                <p className="text-muted-foreground">We accept various cryptocurrencies for anonymous and secure payments.</p>
              </div>
              <div className="text-center p-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                   <Headphones className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Live Support</h3>
                <p className="text-muted-foreground">Our dedicated support team is always here to help you out.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 md:py-28">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
               <h2 className="text-3xl md:text-4xl font-bold">Our Plans</h2>
               <p className="mt-4 text-muted-foreground">
                  Choose the plan that's right for you. All plans come with our top-notch features and support.
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>
        
        <section id="testimonial" className="py-20 md:py-28 bg-card">
           <div className="container px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
              </div>
              <Card className="max-w-2xl mx-auto shadow-lg bg-background">
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
           <div className="container px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
                  <p className="mt-4 text-muted-foreground">
                     Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                  </p>
              </div>
              <div className="max-w-2xl mx-auto">
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
          <div className="container">
            <Card className="bg-primary text-primary-foreground shadow-xl">
              <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-bold">Ready to Start?</h2>
                  <p className="text-primary-foreground/80 mt-2">Get the best spoofing service on the market today!</p>
                </div>
                <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link href="#pricing">Get Started Now</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>

      </main>

      <footer className="py-8 border-t bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tele-Spoof v.2. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
