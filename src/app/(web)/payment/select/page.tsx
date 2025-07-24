
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight, Bitcoin, Gem, Waves, BadgeDollarSign } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

const cryptoOptions = [
    { id: 'usdt', name: 'USDT (Tether)', icon: <BadgeDollarSign className="h-10 w-10 text-primary" /> },
    { id: 'btc', name: 'Bitcoin (BTC)', icon: <Bitcoin className="h-10 w-10 text-primary" /> },
    { id: 'eth', name: 'Ethereum (ETH)', icon: <Gem className="h-10 w-10 text-primary" /> },
    { id: 'ltc', name: 'Litecoin (LTC)', icon: <BadgeDollarSign className="h-10 w-10 text-primary" /> },
    { id: 'xrp', name: 'Ripple (XRP)', icon: <Waves className="h-10 w-10 text-primary" /> },
];

function SelectCryptoComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="max-w-2xl w-full">
            <Card className="shadow-2xl animate-fade-in-up">
              <CardHeader className="text-center p-6 md:p-8">
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Select Your Payment Method
                </CardTitle>
                <CardDescription className="mt-2 text-lg">
                  You are purchasing the <span className="font-bold text-primary">{planName}</span> plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                <div className="grid grid-cols-1 gap-4">
                  {cryptoOptions.map((crypto) => (
                    <Link key={crypto.id} href={`/payment?plan=${encodeURIComponent(planName)}&crypto=${crypto.id}`} passHref>
                      <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary cursor-pointer">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {crypto.icon}
                                <span className="text-lg font-medium">{crypto.name}</span>
                            </div>
                            <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SelectCryptoPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
            <SelectCryptoComponent />
        </Suspense>
    )
}
