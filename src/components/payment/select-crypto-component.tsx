
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

const cryptoOptions = [
    { id: 'usdt', name: 'USDT (Tether)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/tether-usdt-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS90ZXRoZXItdXNkdC1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTM5NSwiZXhwIjoyMDcwNjE5Mzk1fQ.fhb_pip8tRWXjPLa_mbSk128SkA3Xbc-Sug3aOKCVwg" },
    { id: 'usdc', name: 'USDC', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/usdc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS91c2RjLWxvZ28ucG5nIiwiaWF0IjoxNzYwNDE1NTc2LCJleHAiOjIwNzU3NzU1NzZ9.e-g-F4pI0Xo_GfKzEwVzV5m7fFvG7f7v_7g7f7v_7g7" },
    { id: 'btc', name: 'Bitcoin (BTC)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/bitcoin-btc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9iaXRjb2luLWJ0Yy1sb2dvLnBuZyIsImlhdCI6MTc1NTI1OTE2MCwiZXhwIjoyMDcwNjE5MTYwfQ.QtuR1mtG7tW2m96dEa_nZDGhTFeumN7_tfgdwO8MdkI" },
    { id: 'eth', name: 'Ethereum (ETH)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/ethereum-eth-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9ldGhlcmV1bS1ldGgtbG9nby5wbmciLCJpYXQiOjE3NTUyNTkyNjQsImV4cCI6MjA3MDYxOTI2NH0.KkVoeQcTEQUMsT4wHsA0iMhKJAgBjHUmFz8HWLEti7Y" },
    { id: 'ltc', name: 'Litecoin (LTC)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/litecoin-ltc-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9saXRlY29pbi1sdGMtbG9nby5wbmciLCJpYXQiOjE3NTUyNTk1NjAsImV4cCI6MjA3MDYxOTU2MH0.4eQEtvcguQQRC4IDejgvR_qLDuENYcXMV_SU7yaI5uM" },
    { id: 'xrp', name: 'Ripple (XRP)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/xrp-xrp-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS94cnAteHJwLWxvZ28ucG5nIiwiaWF0IjoxNzU1MjU5MzM0LCJleHAiOjIwNzA2MTkzMzR9.LHrbZ3gBHxc8aLUyt1Vx55DiPikExzSemO_veMgkbKs" },
    { id: 'sol', name: 'Solana (SOL)', icon: "https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/solana-sol-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9zb2xhbmEtc29sLWxvZ28ucG5nIiwiaWF0IjoxNzU1MjU5NDQ4LCJleHAiOjIwNzA2MTk0NDh9.3HAAdmK-pMBVFhQzlPPBSNmCPArTezd-BmaCnzobmzw" },
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

export function SelectCryptoComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planName = searchParams.get('plan');
  const [openAccordion, setOpenAccordion] = useState('');
  
  useEffect(() => {
    if (planName) {
      document.title = `Select Payment for ${planName} | REDArmor 2.0`;
    }
  }, [planName]);

  if (!planName) {
    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center container mx-auto px-4">
                <Card className="w-full max-w-md text-center p-8">
                    <CardTitle>No Plan Selected</CardTitle>
                    <CardDescription>Please select a plan first.</CardDescription>
                    <Button asChild className="mt-4">
                        <Link href="/#pricing">View Plans</Link>
                    </Button>
                </Card>
            </main>
            <Footer />
        </div>
    );
  }

  const handleCryptoSelect = (cryptoId: string) => {
    if (cryptoId === 'usdt') {
      setOpenAccordion(openAccordion === 'usdt-item' ? '' : 'usdt-item');
    } else if (cryptoId === 'usdc') {
        setOpenAccordion(openAccordion === 'usdc-item' ? '' : 'usdc-item');
    } else {
      router.push(`/payment?plan=${encodeURIComponent(planName)}&crypto=${cryptoId}`);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const ListItem = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
    <div
      onClick={onClick}
      className={`group relative rounded-lg border bg-background/50 p-4 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-glow hover:-translate-y-1.5 hover:border-primary/50 cursor-pointer ring-1 ring-transparent hover:ring-primary/30 transform-gpu ${className}`}
    >
      <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
      <div className="relative flex items-center justify-between">
        {children}
      </div>
    </div>
  );
  
  const subListContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };
  
  const subListItemVariants = {
    hidden: { x: -15, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="max-w-2xl w-full">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div 
                className="absolute inset-0 bg-grid-pattern-small opacity-20 dark:opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)] -z-10"
              />
              <Card className="shadow-2xl bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader className="text-center p-6 md:p-8">
                  <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    Select Payment Method
                  </CardTitle>
                  <CardDescription className="mt-2 text-lg text-muted-foreground">
                    You are purchasing the <span className="font-bold text-primary">{planName}</span> plan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-8 pt-0">
                  <motion.div 
                    className="grid grid-cols-1 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {cryptoOptions.map((crypto) => {
                       if (crypto.id === 'usdt' || crypto.id === 'usdc') {
                           const accordionId = `${crypto.id}-item`;
                           const networks = crypto.id === 'usdt' ? usdtNetworks : usdcNetworks;
                           return (
                               <motion.div key={crypto.id} variants={itemVariants}>
                                 <Accordion type="single" collapsible value={openAccordion} onValueChange={setOpenAccordion}>
                                     <AccordionItem value={accordionId} className="border-0">
                                        <ListItem onClick={() => handleCryptoSelect(crypto.id)}>
                                            <AccordionTrigger className="w-full p-0 hover:no-underline">
                                              <div className="flex items-center justify-between w-full">
                                                  <div className="flex items-center gap-4">
                                                      <Image src={crypto.icon} alt={`${crypto.name} logo`} width={40} height={40} />
                                                      <span className="text-lg font-medium text-foreground">{crypto.name}</span>
                                                  </div>
                                                  <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary data-[state=open]:rotate-90" />
                                              </div>
                                            </AccordionTrigger>
                                        </ListItem>
                                        <AnimatePresence>
                                          {openAccordion === accordionId && (
                                            <AccordionContent asChild>
                                              <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="pt-2 pl-2 pr-2 overflow-hidden"
                                              >
                                                <motion.div 
                                                  className="grid grid-cols-1 gap-1 pl-4 border-l-2 border-primary/20"
                                                  variants={subListContainerVariants}
                                                  initial="hidden"
                                                  animate="visible"
                                                >
                                                    {networks.map((network) => (
                                                        <motion.div 
                                                          key={network.id}
                                                          variants={subListItemVariants}
                                                        >
                                                            <Link href={`/payment?plan=${encodeURIComponent(planName)}&crypto=${network.id}`} passHref>
                                                                <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                                                                    <span className="text-md font-medium text-foreground group-hover:text-primary">{network.name}</span>
                                                                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                                                                </div>
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                              </motion.div>
                                            </AccordionContent>
                                          )}
                                        </AnimatePresence>
                                     </AccordionItem>
                                 </Accordion>
                               </motion.div>
                           )
                       }
                       return (
                          <motion.div key={crypto.id} variants={itemVariants}>
                            <Link href={`/payment?plan=${encodeURIComponent(planName)}&crypto=${crypto.id}`} passHref>
                                <ListItem>
                                    <div className="flex items-center gap-4">
                                        <Image src={crypto.icon} alt={`${crypto.name} logo`} width={40} height={40} />
                                        <span className="text-lg font-medium text-foreground">{crypto.name}</span>
                                    </div>
                                    <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                                </ListItem>
                            </Link>
                          </motion.div>
                       )
                    })}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

    