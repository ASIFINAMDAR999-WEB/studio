
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
      <path d="M25.48,19.32H23.15V16.37c0-0.41-0.33-0.74-0.74-0.74h-2.1c-0.41,0-0.74,0.33-0.74,0.74v2.95h-2.2v-2.95c0-0.41-0.33-0.74-0.74-0.74h-2.1c-0.41,0-0.74,0.33-0.74,0.74v12.2c0,0.41,0.33,0.74,0.74,0.74h2.1c0.41,0,0.74-0.33,0.74-0.74v-2.95h2.2v2.95c0,0.41,0.33,0.74,0.74,0.74h2.1c0.41,0,0.74-0.33,0.74-0.74V22.2h2.33c1.78,0,3.23-1.45,3.23-3.23v-0.3C28.71,20.77,27.26,19.32,25.48,19.32zM20.57,25.68h-2.2v-5.2h2.2V25.68z M24.3,25.68h-2.2v-5.2h2.2V25.68z" fill="white"/>
    </svg>
);

const EthIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#627EEA"/>
        <path d="M20,4.6l6,9.8l-6,3.6l-6-3.6L20,4.6z M20,20.2l6-3.6l-6,10.8l-6-10.8L20,20.2z" fill="white" fillOpacity="0.6"/>
        <path d="M20,4.6l-6,9.8l6,3.6V4.6z M20,20.2v12.2l6-15.8L20,20.2z" fill="white"/>
    </svg>
);

const UsdtIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#26A17B"/>
        <path d="M20.91,15.28h-1.82v-2.43c0-0.4-0.32-0.72-0.72-0.72h-1.68c-0.4,0-0.72,0.32-0.72,0.72v2.43h-2.14v-2.43c0-0.4-0.32-0.72-0.72-0.72h-1.68c-0.4,0-0.72,0.32-0.72,0.72v11.84c0,0.4,0.32,0.72,0.72,0.72h1.68c0.4,0,0.72-0.32,0.72-0.72v-2.86h2.14v2.86c0,0.4,0.32,0.72,0.72,0.72h1.68c0.4,0,0.72-0.32,0.72-0.72v-2.86h1.82c1.74,0,3.15-1.41,3.15-3.15v-0.3C24.06,16.69,22.65,15.28,20.91,15.28z M19.89,24.96h-2.14v-5.06h2.14V24.96z M23.14,24.96h-2.14v-5.06h2.14V24.96z" fill="white"/>
    </svg>
);

const LtcIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#BFBBBB"/>
        <path d="M20.29,15.71l-3.32,12.78h1.62l0.8-3.07h2.83l-0.58,2.2h1.56l0.8-3.07h1.49l-3.23-12.28H20.29z M22.02,20.48l0.62-2.35l0.31,1.19l0.93,3.54h-2.42L22.02,20.48z M13.88,14.29l-1.3,4.98h-1.22l0.77-2.95h-1.65l-0.77,2.95H8.2l1.3-4.98h1.22l-0.77,2.95h1.65l0.77-2.95H13.88z" fill="white"/>
    </svg>
);

const XrpIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#000000"/>
        <g transform="translate(10, 10) scale(0.5)">
            <path d="M20,0,14,6l6,6Z" fill="#fff" />
            <path d="M6,14,0,20l6,6Z" fill="#fff" />
            <path d="M20,40,6-6-6-6Z" fill="#fff" />
            <path d="M34,14l6,6-6,6Z" fill="#fff" />
        </g>
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
