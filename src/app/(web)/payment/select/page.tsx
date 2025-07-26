
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

const BtcIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#F7931A"/>
        <path d="M25.2,19.9H23.5V17.3c0-0.4-0.3-0.7-0.7-0.7h-2.1c-0.4,0-0.7,0.3-0.7,0.7v2.6h-2.2V17.3c0-0.4-0.3-0.7-0.7-0.7h-2.1c-0.4,0-0.7,0.3-0.7,0.7v11.4c0,0.4,0.3,0.7,0.7,0.7h2.1c0.4,0,0.7-0.3,0.7-0.7v-2.6h2.2v2.6c0,0.4,0.3,0.7,0.7,0.7h2.1c0.4,0,0.7-0.3,0.7-0.7v-2.6h1.7c1.7,0,3.1-1.4,3.1-3.1v-0.3C28.3,21.3,26.9,19.9,25.2,19.9z M20.5,25.7h-2.2v-4.8h2.2V25.7z M24,25.7h-2.2v-4.8h2.2V25.7z" fill="white"/>
    </svg>
);

const EthIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#627EEA"/>
        <path d="M20,10.4l6,5.8l-6,3.6l-6-3.6L20,10.4z" fill="white" fillOpacity="0.602"/>
        <path d="M20,21.6l6-3.6l-6,9.8l-6-9.8L20,21.6z" fill="white"/>
    </svg>
);

const UsdtIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#26A17B"/>
        <path d="M20.98,15H15.86c-0.55,0-1,0.45-1,1v4h-2.14v-4c0-0.55-0.45-1-1-1h-2.29c-0.55,0-1,0.45-1,1v10c0,0.55,0.45,1,1,1h2.29c0.55,0,1-0.45,1-1v-4h2.14v4c0,0.55,0.45,1,1,1h5.12c2.21,0,4-1.79,4-4v-3C24.98,16.79,23.19,15,20.98,15z" fill="white"/>
    </svg>
);

const LtcIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#BFBBBB"/>
        <path d="M17.4,14.6h3.4l-1.3,4.9h-2.9L17.4,14.6z M22.8,14.6h3.4l-1.3,4.9h-2.9L22.8,14.6z M16.7,20.7l1.3-4.9h-3.4l-1.3,4.9H16.7z M22,20.7l1.3-4.9h-3.4l-1.3,4.9H22z M17.4,25.4h2.9l1.3-4.9h-3.4L17.4,25.4z" fill="white" transform="translate(1.5, 2.5) rotate(-15, 20, 20)"/>
    </svg>
);

const XrpIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#000000"/>
        <path d="M23.9,16.1l-2.8,2.8l2.8,2.8l-1.2,1.2l-2.8-2.8l-2.8,2.8l-1.2-1.2l2.8-2.8l-2.8-2.8l1.2-1.2l2.8,2.8l2.8-2.8L23.9,16.1z M16.1,23.9l2.8-2.8l-2.8-2.8l1.2-1.2l2.8,2.8l2.8-2.8l1.2,1.2l-2.8,2.8l2.8,2.8l-1.2,1.2l-2.8-2.8l-2.8,2.8L16.1,23.9z" fill="white"/>
    </svg>
);

const cryptoOptions = [
    { id: 'usdt', name: 'USDT (Tether)', icon: <UsdtIcon /> },
    { id: 'btc', name: 'Bitcoin (BTC)', icon: <BtcIcon /> },
    { id: 'eth', name: 'Ethereum (ETH)', icon: <EthIcon /> },
    { id: 'ltc', name: 'Litecoin (LTC)', icon: <LtcIcon /> },
    { id: 'xrp', name: 'Ripple (XRP)', icon: <XrpIcon /> },
];

function SelectCryptoComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="max-w-2xl w-full">
            <div className="relative animate-fade-in-up">
              <div 
                className="absolute inset-0 bg-grid-pattern-small opacity-20 dark:opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"
              />
              <Card className="shadow-2xl bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center p-6 md:p-8">
                  <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    Select Your Payment Method
                  </CardTitle>
                  <CardDescription className="mt-2 text-lg text-muted-foreground">
                    You are purchasing the <span className="font-bold text-primary">{planName}</span> plan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0">
                  <div className="grid grid-cols-1 gap-4">
                    {cryptoOptions.map((crypto) => (
                      <Link key={crypto.id} href={`/payment?plan=${encodeURIComponent(planName)}&crypto=${crypto.id}`} passHref>
                        <div className="group rounded-lg border bg-background/50 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 hover:bg-muted/50 cursor-pointer ring-1 ring-transparent hover:ring-primary/30">
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                  {crypto.icon}
                                  <span className="text-lg font-medium text-foreground">{crypto.name}</span>
                              </div>
                              <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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
