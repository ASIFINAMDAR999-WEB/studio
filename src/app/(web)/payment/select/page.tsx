
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
        <path d="M25.48 20.37C26.04 19.64 26.39 18.73 26.31 17.8C26.22 16.7 25.68 15.79 24.84 15.22L24.83 15.22C24.23 14.83 23.51 14.61 22.77 14.54V12H19.77V14.49C19.46 14.52 19.16 14.56 18.86 14.62L18.87 14.62V12H15.87V14.62C15.54 14.67 15.22 14.73 14.9 14.8L16.48 16.7C17.06 16.49 17.68 16.35 18.32 16.29L18.34 22.99C17.67 23.1 17.02 23.31 16.42 23.69L14.86 25.59C15.21 25.66 15.54 25.72 15.87 25.77V28H18.87V25.82C19.18 25.79 19.48 25.75 19.77 25.7V28H22.77V25.7C23.57 25.55 24.27 25.23 24.86 24.77C25.96 23.83 26.46 22.4 26.16 21.06C25.94 20.06 25.32 19.23 24.45 18.75L25.48 20.37ZM20.02 16.63C20.01 16.63 19.99 16.63 19.98 16.63C19.16 16.73 18.75 17.06 18.75 17.06C18.75 17.06 18.72 17.09 18.75 17.11C18.79 17.16 18.85 17.2 18.92 17.22L19.5 17.36C20.65 17.61 21.1 17.91 21.32 18.17C21.61 18.52 21.66 19.03 21.56 19.46C21.39 20.15 20.81 20.53 20.02 20.73L20.02 16.63ZM21.94 23.11C21.43 23.48 20.8 23.63 20.02 23.75V21.11C20.86 20.91 21.63 20.59 22.02 20.02C22.37 19.49 22.38 18.8 22.09 18.25C21.89 17.86 21.55 17.65 21.1 17.47L21.94 23.11Z" fill="white"/>
    </svg>
);

const EthIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#627EEA"/>
        <path d="M20.0001 10.97L19.8601 11.45V23.73L20.0001 23.87L25.9901 20.97L20.0001 10.97Z" fill="white" fillOpacity="0.6"/>
        <path d="M20.0001 10.97L14.0101 20.97L20.0001 23.87V10.97Z" fill="white"/>
        <path d="M20.0001 25.1L19.9201 25.18V28.9L20.0001 29.03L26.0001 22.2L20.0001 25.1Z" fill="white" fillOpacity="0.6"/>
        <path d="M20.0001 29.03V25.1L14.0101 22.2L20.0001 29.03Z" fill="white"/>
        <path d="M20.0001 23.87L25.9901 20.97L20.0001 16.42V23.87Z" fill="white" fillOpacity="0.2"/>
        <path d="M14.0101 20.97L20.0001 23.87V16.42L14.0101 20.97Z" fill="white" fillOpacity="0.6"/>
    </svg>
);

const UsdtIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#26A17B"/>
        <path d="M21.14 12H18.86V15.71C17.43 15.93 15.5 16.63 15.5 18.66C15.5 20.31 16.7 21.15 18.06 21.57V25C16.14 24.53 14 23.5 14 20.95H16.29C16.29 22.39 17.43 23.01 18.86 23.29V19.46C17.29 19.05 16.29 18.23 16.29 17.02C16.29 15.82 17.29 14.93 18.86 14.6V12V11H21.14V14.6C22.71 14.93 23.71 15.82 23.71 17.02C23.71 18.23 22.71 19.05 21.14 19.46V23.29C22.57 23.01 23.71 22.39 23.71 20.95H26C26 23.5 23.86 24.53 21.94 25V21.57C23.3 21.15 24.5 20.31 24.5 18.66C24.5 16.63 22.57 15.93 21.14 15.71V12Z" fill="white"/>
    </svg>
);

const LtcIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#B4B4B4"/>
        <path d="M21.53 11L18.73 21.84L22.42 20.59L23.47 16.59L26 17.71L24.54 23.32L15.34 26.71L14.73 29H12L13.75 22.18L10.06 23.43L9 27.42L6.5 26.3L7.95 20.69L17.15 17.3L17.76 15L21.53 11Z" fill="white"/>
    </svg>
);

const XrpIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#000000"/>
        <path d="M15.42 16.8L12 18.59L15.42 20.39V23L10.01 20.07V17.11L15.42 14.19V16.8Z" fill="white"/>
        <path d="M24.58 23.2L28 21.41L24.58 19.61V17L30 19.93V22.89L24.58 25.81V23.2Z" fill="white"/>
        <path d="M21.81 12L18.19 28H20.39L23.99 12H21.81Z" fill="white"/>
    </svg>
);

const SolanaIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="black"/>
        <path d="M9.42,12.36,6,13.51V11.21l11.4-4.24,3.42,1.15L9.42,12.36ZM6,15.29l3.42,1.14L20.82,12,6,15.29Zm15.18,4.24L24,18.38V20.68L12.6,24.92,9.18,23.77,21.18,19.53ZM24,16.63,20.58,15.49,9.18,19.72,24,16.63Z" fill="url(#solana-gradient)" />
        <defs>
            <linearGradient id="solana-gradient" x1="6" y1="18" x2="24" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14F195" />
                <stop offset="1" stopColor="#9945FF" />
            </linearGradient>
        </defs>
    </svg>
);

const cryptoOptions = [
    { id: 'usdt', name: 'USDT (Tether)', icon: <UsdtIcon /> },
    { id: 'btc', name: 'Bitcoin (BTC)', icon: <BtcIcon /> },
    { id: 'eth', name: 'Ethereum (ETH)', icon: <EthIcon /> },
    { id: 'ltc', name: 'Litecoin (LTC)', icon: <LtcIcon /> },
    { id: 'xrp', name: 'Ripple (XRP)', icon: <XrpIcon /> },
    { id: 'sol', name: 'Solana (SOL)', icon: <SolanaIcon /> },
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
                    Select Payment Method
                  </CardTitle>
                  <CardDescription className="mt-2 text-lg text-muted-foreground">
                    You are purchasing the <span className="font-bold text-primary">{planName}</span> plan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-8 pt-0">
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
