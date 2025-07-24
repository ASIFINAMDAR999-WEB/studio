
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
    { id: 'usdt', name: 'USDT (Tether)', icon: <BadgeDollarSign className="h-8 w-8 text-primary" /> },
    { id: 'btc', name: 'Bitcoin (BTC)', icon: <Bitcoin className="h-8 w-8 text-primary" /> },
    { id: 'eth', name: 'Ethereum (ETH)', icon: <Gem className="h-8 w-8 text-primary" /> },
    { id: 'ltc', name: 'Litecoin (LTC)', icon: <BadgeDollarSign className="h-8 w-8 text-primary" /> },
    { id: 'xrp', name: 'Ripple (XRP)', icon: <Waves className="h-8 w-8 text-primary" /> },
];

function SelectCryptoComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-16 flex items-center justify-center">
        <div className="max-w-2xl w-full">
            <Card className="shadow-2xl animate-fade-in-up">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Select Your Payment Method
                </CardTitle>
                <CardDescription className="mt-2 text-lg">
                  You are purchasing the <span className="font-bold text-primary">{planName}</span> plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 md:p-8">
                {cryptoOptions.map((crypto) => (
                  <Button
                    key={crypto.id}
                    asChild
                    variant="outline"
                    className="w-full justify-between items-center p-6 text-lg h-auto transition-all duration-300 hover:bg-primary/5 hover:shadow-md"
                  >
                    <Link href={`/payment?plan=${encodeURIComponent(planName)}&crypto=${crypto.id}`}>
                      <div className="flex items-center gap-4">
                        {crypto.icon}
                        <span>{crypto.name}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </Button>
                ))}
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
