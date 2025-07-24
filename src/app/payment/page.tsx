
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clipboard, Menu, Terminal, Shield } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { plans } from '@/app/page';
import { NavLinks } from '@/components/nav-links';

function PaymentPageComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';
  const plan = plans.find((p) => p.name === planName) || plans[0];

  const bitcoinAddress = process.env.NEXT_PUBLIC_BITCOIN_ADDRESS || 'bc1q5c1kxvk8u9';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bitcoinAddress);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="py-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">REDArmor v0.2</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {/* Minimal nav for payment page */}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3zM15.5 6.25a.75.75 0 00-1.06-1.06L13.38 6.25a.75.75 0 001.06 1.06l1.06-1.06zM3.75 6.25a.75.75 0 001.06 1.06L5.87 6.25a.75.75 0 00-1.06-1.06L3.75 6.25zM17 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 10a.75.75 0 00-.75-.75h-1.5a.75.75 0 000 1.5h1.5a.75.75 0 00.75-.75zM10 17a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM13.38 13.75a.75.75 0 00-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.62 13.75a.75.75 0 00-1.06 1.06l1.06 1.06a.75.75 0 101.06-1.06l-1.06-1.06z" />
                <path fillRule="evenodd" d="M10 5a5 5 0 100 10 5 5 0 000-10zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                </svg>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-8">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Complete Your Purchase
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Follow the steps below to securely complete your payment.
            </p>
          </div>

          <Card className="bg-muted/30 border-l-4 border-primary mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <Terminal className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">You are paying for: {plan.name}</p>
                  <p className="text-sm text-muted-foreground">Please double-check all details before sending your payment.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">Introductory offer for new clients. Includes all premium features.</p>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-5xl font-bold">{plan.priceString}</span>
                        <span className="text-xl text-muted-foreground">{plan.duration}</span>
                    </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Payment Instructions</h2>
              <Card className="shadow-lg">
                <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className="font-bold text-lg mb-2">Pay with Bitcoin</h3>
                      <p className="text-muted-foreground mb-4">Send the exact amount to the address below.</p>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Bitcoin Address (Bitcoin)</p>
                        <div className="flex justify-between items-center">
                          <p className="font-mono text-lg break-all">{bitcoinAddress}</p>
                          <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                            <Clipboard className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-bold mb-2 text-primary">Important Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                        <li>Send the <span className="font-bold text-foreground">exact amount</span> to the address shown.</li>
                        <li>For XRP, a destination tag is not required.</li>
                        <li>After payment, send a screenshot of the transaction to our admin on Telegram.</li>
                        <li>Admin: <span className="font-bold text-foreground">@AF3092</span></li>
                        <li>Your plan will be activated once the transaction is confirmed.</li>
                      </ol>
                    </div>

                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6">
                      Contact Admin on Telegram
                    </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Avatar className="h-8 w-8">
               <AvatarFallback className="bg-foreground text-background font-bold text-sm">N</AvatarFallback>
            </Avatar>
            <Link href="#" className="text-sm hover:underline">Terms of Service</Link>
            <Link href="#" className="text-sm hover:underline">Privacy Policy</Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} REDArmor v0.2. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageComponent />
        </Suspense>
    )
}
