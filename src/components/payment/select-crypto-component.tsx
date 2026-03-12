
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const cryptoOptions = [
    { id: 'usdt', name: 'USDT (Tether)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/tether-usdt-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90ZXRoZXItdXNkdC1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTM5NSwiZXhwIjoyMDcwNjE5Mzk1fQ.fhb_pip8tRWXjPLa_mbSk128SkA3Xbc-Sug3aOKCVwg" },
    { id: 'usdc', name: 'USDC', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0235.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDIzNS5wbmciLCJpYXQiOjE3NjQzMjQ4NjcsImV4cCI6MjA3OTY4NDg2N30.1God1vSavtFKl_G9ZkHYK703kjXvZAPvglBpWj1RaBo" },
    { id: 'sol', name: 'Solana (SOL)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/solana-sol-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9zb2xhbmEtc29sLWxvZ28ucG5nIiwiaWF0IjoxNzU1MjU5NDQ4LCJleHAiOjIwNzA2MTk0NDh9.3HAAdmK-pMBVFhQzlPPBSNmCPArTezd-BmaCnzobmzw" },
    { id: 'btc', name: 'Bitcoin (BTC)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/bitcoin-btc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9iaXRjb2luLWJ0Yy1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTE2MCwiZXhwIjoyMDcwNjE5MTYwfQ.QtuR1mtG7tW2m96dEa_nZDGhTFeumN7_tfgdwO8MdkI" },
    { id: 'eth', name: 'Ethereum (ETH)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/ethereum-eth-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9ldGhlcmV1bS1ldGgtbG9nby5wbmciLCJpYXQiOjE3NTUyNTkyNjQsImV4cCI6MjA3MDYxOTI2NH0.KkVoeQcTEQUMsT4wHsA0iMhKJAgBjHUmFz8HWLEti7Y" },
    { id: 'ltc', name: 'Litecoin (LTC)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/litecoin-ltc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9saXRlY29pbi1sdGMtbG9nby5wbmciLCJpYXQiOjE3NTUyNTk1NjAsImV4cCI6MjA3MDYxOTU2MH0.4eQEtvcguQQRC4IDejgvR_qLDuENYcXMV_SU7yaI5uM" },
    { id: 'xrp', name: 'Ripple (XRP)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/xrp-xrp-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS94cnAteHJwLWxvZ28ucG5nIiwiaWF0IjoxNzU1MjU5MzM0LCJleHAiOjIwNzA2MTkzMzR9.LHrbZ3gBHxc8aLUyt1Vx55DiPikExzSemO_veMgkbKs" },
    { id: 'trx', name: 'Tron (TRX)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/tron-trx-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90cm9uLXRyeC1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTQ5OCwiZXhwIjoyMDcwNjE5NDk4fQ.FvrK49yFNZ0l9G1vuvXy5wCTfQtJB83rcVLfobZgoe8" },
    { id: 'ton', name: 'TON', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/toncoin-ton-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90b25jb2luLXRvbi1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTYwMiwiZXhwIjoyMDcwNjE5NjAyfQ.QW-O_jKeo3LYkKHWPxlzHAXpZyukPdRCr5afBIIy7Ao" },
];

const usdtNetworks = [
    { id: 'usdt_trc20', name: 'USDT TRC-20' },
    { id: 'usdt_erc20', name: 'USDT ERC-20' },
    { id: 'usdt_bep20', name: 'USDT BEP-20' },
];

const usdcNetworks = [
    { id: 'usdc_trc20', name: 'USDC TRC-20' },
    { id: 'usdc_erc20', name: 'USDC ERC-20' },
];

const solNetworks = [
    { id: 'sol', name: 'Solana Network (Native)' },
    { id: 'sol_bep20', name: 'Solana BEP-20 (BSC)' },
];

export function SelectCryptoComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planName = searchParams.get('plan');
  const [openAccordion, setOpenAccordion] = useState('');
  
  useEffect(() => {
    if (planName) document.title = `Select Payment Method | REDArmor 2.0`;
  }, [planName]);

  if (!planName) {
    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header /><main className="flex-1 flex items-center justify-center container mx-auto px-4"><Card className="w-full max-w-md text-center p-8"><CardTitle>No Plan Selected</CardTitle><Button asChild className="mt-4"><Link href="/#pricing">View Plans</Link></Button></Card></main><Footer />
        </div>
    );
  }

  const handleCryptoSelect = (cryptoId: string) => {
    if (['usdt', 'usdc', 'sol'].includes(cryptoId)) {
      setOpenAccordion(openAccordion === `${cryptoId}-item` ? '' : `${cryptoId}-item`);
    } else {
      router.push(`/payment?plan=${encodeURIComponent(planName)}&crypto=${cryptoId}`);
    }
  };
  
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-16">
        <div className="max-w-2xl w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="shadow-2xl bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold">Select Payment Method</CardTitle>
                  <CardDescription>Purchasing: <span className="font-bold text-primary">{planName}</span></CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-8 pt-0">
                  <div className="grid grid-cols-1 gap-4">
                    {cryptoOptions.map((crypto) => {
                       if (['usdt', 'usdc', 'sol'].includes(crypto.id)) {
                           const networks = crypto.id === 'usdt' ? usdtNetworks : crypto.id === 'usdc' ? usdcNetworks : solNetworks;
                           return (
                               <Accordion key={crypto.id} type="single" collapsible value={openAccordion} onValueChange={setOpenAccordion}>
                                   <AccordionItem value={`${crypto.id}-item`} className="border-0">
                                      <div onClick={() => handleCryptoSelect(crypto.id)} className="group relative rounded-lg border bg-background/50 p-4 hover:shadow-glow cursor-pointer transition-all">
                                          <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-4">
                                                  <Image src={crypto.icon} alt={crypto.name} width={40} height={40} />
                                                  <span className="text-lg font-medium">{crypto.name}</span>
                                              </div>
                                              <ChevronRight className={cn("h-6 w-6 transition-transform duration-300", openAccordion === `${crypto.id}-item` && "rotate-90")} />
                                          </div>
                                      </div>
                                      <AccordionContent>
                                          <div className="grid grid-cols-1 gap-1 pl-4 mt-2 border-l-2 border-primary/20">
                                              {networks.map((network) => (
                                                  <Link key={network.id} href={`/payment?plan=${encodeURIComponent(planName)}&crypto=${network.id}`}>
                                                      <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                                                          <span className="font-medium group-hover:text-primary">{network.name}</span>
                                                          <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                      </div>
                                                  </Link>
                                              ))}
                                          </div>
                                      </AccordionContent>
                                   </AccordionItem>
                               </Accordion>
                           )
                       }
                       return (
                          <Link key={crypto.id} href={`/payment?plan=${encodeURIComponent(planName)}&crypto=${crypto.id}`}>
                              <div className="group relative rounded-lg border bg-background/50 p-4 hover:shadow-glow cursor-pointer transition-all">
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-4">
                                          <Image src={crypto.icon} alt={crypto.name} width={40} height={40} />
                                          <span className="text-lg font-medium">{crypto.name}</span>
                                      </div>
                                      <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                  </div>
                              </div>
                          </Link>
                       )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
