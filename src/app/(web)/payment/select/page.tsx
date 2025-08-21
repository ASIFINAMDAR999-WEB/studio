
'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

// Note: Since this is a client component, this metadata will not be statically rendered.
// To have static metadata, this page would need to be a server component.
export const metadata: Metadata = {
  title: 'Select Payment Method | REDArmor 2.0',
  description: 'Choose your preferred cryptocurrency to pay for your REDArmor 2.0 plan. We accept BTC, ETH, USDT, and more.',
  alternates: {
    canonical: 'https://www.callspoofing.shop/payment/select',
  },
};

const cryptoOptions = [
    { id: 'usdt', name: 'USDT (Tether)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/tether-usdt-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90ZXRoZXItdXNkdC1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTM5NSwiZXhwIjoyMDcwNjE5Mzk1fQ.fhb_pip8tRWXjPLa_mbSk128SkA3Xbc-Sug3aOKCVwg" },
    { id: 'btc', name: 'Bitcoin (BTC)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/bitcoin-btc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9iaXRjb2luLWJ0Yy1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTE2MCwiZXhwIjoyMDcwNjE5MTYwfQ.QtuR1mtG7tW2m96dEa_nZDGhTFeumN7_tfgdwO8MdkI" },
    { id: 'eth', name: 'Ethereum (ETH)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/ethereum-eth-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9ldGhlcmV1bS1ldGgtbG9nby5wbmciLCJpYXQiOjE3NTUyNTkyNjQsImV4cCI6MjA3MDYxOTI2NH0.KkVoeQcTEQUMsT4wHsA0iMhKJAgBjHUmFz8HWLEti7Y" },
    { id: 'ltc', name: 'Litecoin (LTC)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/litecoin-ltc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9saXRlY29pbi1sdGMtbG9nby5wbmciLCJpYXQiOjE3NTUyNTk1NjAsImV4cCI6MjA3MDYxOTU2MH0.4eQEtvcguQQRC4IDejgvR_qLDuENYcXMV_SU7yaI5uM" },
    { id: 'xrp', name: 'Ripple (XRP)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/xrp-xrp-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS94cnAteHJwLWxvZ28ucG5nIiwiaWF0IjoxNzU1MjU5MzM0LCJleHAiOjIwNzA2MTkzMzR9.LHrbZ3gBHxc8aLUyt1Vx55DiPikExzSemO_veMgkbKs" },
    { id: 'sol', name: 'Solana (SOL)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/solana-sol-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9zb2xhbmEtc29sLWxvZ28ucG5nIiwiaWF0IjoxNzU1MjU5NDQ4LCJleHAiOjIwNzA2MTk0NDh9.3HAAdmK-pMBVFhQzlPPBSNmCPArTezd-BmaCnzobmzw" },
    { id: 'trx', name: 'Tron (TRX)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/tron-trx-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90cm9uLXRyeC1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTQ5OCwiZXhwIjoyMDcwNjE5NDk4fQ.FvrK49yFNZ0l9G1vuvXy5wCTfQtJB83rcVLfobZgoe8" },
    { id: 'ton', name: 'TON', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/toncoin-ton-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90b25jb2luLXRvbi1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTYwMiwiZXhwIjoyMDcwNjE5NjAyfQ.QW-O_jKeo3LYkKHWPxlzHAXpZyukPdRCr5afBIIy7Ao" },
];

function SelectCryptoComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';

  useEffect(() => {
    document.title = `Select Payment for ${planName} | REDArmor 2.0`;
  }, [planName]);

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
                                  <Image src={crypto.icon} alt={`${crypto.name} logo`} width={40} height={40} />
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
