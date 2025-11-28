
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Clipboard, Wallet, AlertTriangle, Send, ShieldCheck, ArrowLeft, PenSquare, Gift, Copy, RefreshCw } from 'lucide-react';
import { plans } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const addresses: Record<string, { network: string; address: string }> = {
  usdt_trc20: { network: 'USDT TRC-20 (Tron Network)', address: 'TWZ3Hm2dHGm89DiwhQiYcaFJjET9GEQd43' },
  usdt_erc20: { network: 'USDT ERC-20 (Ethereum Network)', address: '0x7C7bA0bc477d6a3A2537Ae31f4C20041285d6D33' },
  usdt_bep20: { network: 'USDT BEP-20 (Binance Smart Chain)', address: '0x7C7bA0bc477d6a3A2537Ae31f4C20041285d6D33' },
  btc: { network: 'Bitcoin (BTC) Network', address: 'bc1qu2n89ewls4vavkkycruldddl9a0vv5anhll335' },
  eth: { network: 'Ethereum (ETH) Network', address: '0x7C7bA0bc477d6a3A2537Ae31f4C20041285d6D33' },
  ltc: { network: 'Litecoin (LTC) Network', address: 'ltc1q3rt0qrkhx345z8p4ywwy7tgyg7qnap637qldtr' },
  xrp: { network: 'Ripple (XRP) Network', address: 'rGZ2q9ZqiSmVVY7hRgjTsUUVt5ENvD6LA8' },
  sol: { network: 'Solana (SOL) Network', address: 'bwsBf16YnxBZqHx21AnBkr51VvxpKEYbax9wf9q4tJh' },
  trx: { network: 'Tron (TRX) TRC-20 Network', address: 'TWZ3Hm2dHGm89DiwhQiYcaFJjET9GEQd43' },
  ton: { network: 'TON', address: 'UQDM6ugfIQm_-QOaeMPsc8VeuU78-wVEafeol-x-T76Hmh6Z' },
  usdc_erc20: { network: 'USDC ERC-20 (Ethereum Network)', address: '0x7C7bA0bc477d6a3A2537Ae31f4C20041285d6D33' },
  usdc_trc20: { network: 'USDC TRC-20 (Tron Network)', address: 'TWZ3Hm2dHGm89DiwhQiYcaFJjET9GEQd43' },
};

const cryptoOptions: Record<string, { name: string; networks: string[]; apiId: string; symbol: string; precision: number }> = {
    usdt_trc20: { name: 'USDT (Tether)', networks: ['usdt_trc20'], apiId: 'tether', symbol: 'USDT', precision: 6},
    usdt_erc20: { name: 'USDT (Tether)', networks: ['usdt_erc20'], apiId: 'tether', symbol: 'USDT', precision: 6},
    usdt_bep20: { name: 'USDT (Tether)', networks: ['usdt_bep20'], apiId: 'tether', symbol: 'USDT', precision: 6},
    btc: { name: 'Bitcoin (BTC)', networks: ['btc'], apiId: 'bitcoin', symbol: 'BTC', precision: 8},
    eth: { name: 'Ethereum (ETH)', networks: ['eth'], apiId: 'ethereum', symbol: 'ETH', precision: 8},
    ltc: { name: 'Litecoin (LTC)', networks: ['ltc'], apiId: 'litecoin', symbol: 'LTC', precision: 8},
    xrp: { name: 'Ripple (XRP)', networks: ['xrp'], apiId: 'ripple', symbol: 'XRP', precision: 6},
    sol: { name: 'Solana (SOL)', networks: ['sol'], apiId: 'solana', symbol: 'SOL', precision: 8},
    trx: { name: 'Tron (TRX)', networks: ['trx'], apiId: 'tron', symbol: 'TRX', precision: 6},
    ton: { name: 'TON', networks: ['ton'], apiId: 'the-open-network', symbol: 'TON', precision: 6},
    usdc_erc20: { name: 'USDC', networks: ['usdc_erc20'], apiId: 'usd-coin', symbol: 'USDC', precision: 6},
    usdc_trc20: { name: 'USDC', networks: ['usdc_trc20'], apiId: 'usd-coin', symbol: 'USDC', precision: 6},
}

const qrCodes: Record<string, string> = {
  btc: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0237.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDIzNy5qcGVnIiwiaWF0IjoxNzY0MzI1NjA1LCJleHAiOjIwNzk2ODU2MDV9.FusCZL0C9cpoZL9eTO7SYFpbJkJRviHgBwzIp3MYJtU',
  trx: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0241.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0MS5qcGVnIiwiaWF0IjoxNzY0MzI2ODAxLCJleHAiOjIwNzk2ODY4MDF9.aYMz0dQZd7FYRLbQT80I6x5-RME2l3a-aRthMFiN9i4',
  eth: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0238.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDIzOC5qcGVnIiwiaWF0IjoxNzY0MzI1OTYxLCJleHAiOjIwNzk2ODU5NjF9.JVaVtLEFux2tgG2RN4a-RRdZTT6u7ibrL9NFkX0tRR0',
  ltc: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0240.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0MC5qcGVnIiwiaWF0IjoxNzY0MzI2NTM1LCJleHAiOjIwNzk2ODY1MzV9.PGwr-b4N4md8WeiMV7PzZWQu_YOhvS-H_WZ_nGVOTag',
  xrp: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0239.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDIzOS5qcGVnIiwiaWF0IjoxNzY0MzI2MjU3LCJleHAiOjIwNzk2ODYyNTd9.2TeaIV4fh4PamtriuS5IcurgJlIG1wkjeWOzl3oW-q8',
  sol: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0242.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0Mi5qcGVnIiwiaWF0IjoxNzY0MzI3MDI5LCJleHAiOjIwNzk2ODcwMjl9.N3AeshU0m7n8ATzAWFpS9cPiaUjqjJ1dw4xMknnKAE0',
  ton: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0243.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0My5qcGVnIiwiaWF0IjoxNzY0MzI3MjkxLCJleHAiOjIwNzk2ODcyOTF9._GFJPlro3lzsTbPWpWYfw7qMX5R62ppIkw5HVFjAaHI',
  usdc_erc20: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0244.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0NC5qcGVnIiwiaWF0IjoxNzY0MzI3NTc3LCJleHAiOjIwNzk2ODc1Nzd9.SIa86pTJ20QGsQYX1KJ-_KrE0jfS86hBL7ORZI97KLA',
  usdt_trc20: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0247.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0Ny5qcGVnIiwiaWF0IjoxNzY0MzI4NTU5LCJleHAiOjIwNzk2ODg1NTl9.SBEBF0fafl5rrR39LW_rzMyCp_PGjdov3akw70uSV48',
  usdt_bep20: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0248.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0OC5qcGVnIiwiaWF0IjoxNzY0MzI4Nzk2LCJleHAiOjIwNzk2ODg3OTZ9.6QiBxhzaAuUqjKSwbXjIk9v3ISi0DoFbfYrmhIBxdc8',
  usdt_erc20: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0246.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0Ni5qcGVnIiwiaWF0IjoxNzY0MzI4MzIxLCJleHAiOjIwNzk2ODgzMjF9.Cq6rPCfuI5oi_EG1_SwGqUdqWrz_eyAtYfTljdaJp9w',
  usdc_trc20: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0245.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDI0NS5qcGVnIiwiaWF0IjoxNzY0MzI3NzI5LCJleHAiOjIwNzk2ODc3Mjl9.2f4R2BnxZE0w9-Jq343KvEjoHnDEbhVKaZUQBO_-ugQ',
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1500; // in ms

export function PaymentPageComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';
  const cryptoKey = searchParams.get('crypto');
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isPriceLoading, setIsPriceLoading] = useState(true);
  const [isAmountCopied, setIsAmountCopied] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const fetchPrices = useCallback(async (isRetry = false) => {
    setIsPriceLoading(true);
    const apiIds = [...new Set(Object.values(cryptoOptions).map(c => c.apiId))].join(',');
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${apiIds}&vs_currencies=usd`);
        if (!response.ok) {
          throw new Error(`CoinGecko API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const newPrices: Record<string, number> = {};
        let allPricesFound = true;
        for (const id of apiIds.split(',')) {
            if (data[id] && data[id].usd) {
                newPrices[id] = data[id].usd;
            } else {
                allPricesFound = false;
                console.warn(`Price for ${id} not found in CoinGecko response.`);
            }
        }

        if (!allPricesFound && Object.keys(newPrices).length === 0) {
           throw new Error("No prices returned from API.");
        }

        setPrices(newPrices);
        setIsPriceLoading(false);
        return; // Success, exit the loop
      } catch (error) {
        console.error(`Attempt ${attempt} to fetch crypto prices failed:`, error);
        if (attempt === MAX_RETRIES) {
          setIsPriceLoading(false);
          toast({
            title: "Error Loading Prices",
            description: "Could not load live crypto rates. Please check your connection and refresh.",
            variant: "destructive",
          });
        } else {
          // Wait before retrying
          await new Promise(res => setTimeout(res, RETRY_DELAY));
        }
      }
    }
  }, [toast]);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchPrices]);

  useEffect(() => {
    document.title = `Payment for ${planName} | REDArmor 2.0`;
  }, [planName]);

  const isTopUp = planName.includes('Silver Plan');
  const topUpAmount = isTopUp ? planName.split(' - ')[1] : null;

  const basePlanName = isTopUp ? planName.split(' - ')[0] : planName;
  const plan = plans.find((p) => p.name === basePlanName) || plans[0];
  
  const planUsdPrice = parseFloat((topUpAmount || plan.priceString).replace('$', ''));

  const copyToClipboard = (text: string | undefined, type: 'amount' | 'address') => {
    if (text) {
      navigator.clipboard.writeText(text);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      if (type === 'amount') {
        setIsAmountCopied(true);
        setTimeout(() => setIsAmountCopied(false), 2000);
      } else {
        setIsAddressCopied(true);
        setTimeout(() => setIsAddressCopied(false), 2000);
      }
      toast({
        title: "Copied to clipboard",
        description: "The value has been copied to your clipboard.",
      });
    } else {
      toast({
        title: "Error",
        description: "Value is not available to copy.",
        variant: "destructive",
      });
    }
  };
  
  const selectedCrypto = cryptoKey ? cryptoOptions[cryptoKey] : null;
  const qrCodeUrl = cryptoKey ? qrCodes[cryptoKey] : null;
  const currentPrice = selectedCrypto ? prices[selectedCrypto.apiId] : undefined;

  const isStablecoin = cryptoKey?.startsWith('usdt') || cryptoKey?.startsWith('usdc');
  const finalUsdPrice = isStablecoin ? planUsdPrice : planUsdPrice * 1.01; // 1% buffer for non-stablecoins
  const cryptoAmount = (currentPrice && planUsdPrice) ? (finalUsdPrice / currentPrice) : undefined;

  const cryptoAmountString = cryptoAmount?.toFixed(selectedCrypto?.precision || 8);


  const instructions = [
    { icon: <AlertTriangle className="h-5 w-5 text-primary" />, text: <>Send the <span className="font-bold text-foreground">exact amount.</span> Double-check the address and network before sending.</> },
    { icon: <PenSquare className="h-5 w-5 text-primary" />, text: "After payment, send a screenshot of the transaction to our admin on Telegram." },
    { icon: <Send className="h-5 w-5 text-primary" />, text: <>Admin Telegram: <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:underline">@AF3092</a></> },
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, text: "Your plan will be activated once the transaction is confirmed by our team." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <audio ref={audioRef} src="/applepay.mp3" preload="auto" className="hidden"></audio>
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Complete Your Purchase
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              You're almost there! Follow the steps below to securely complete your payment.
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-l-4 border-primary transition-all duration-300 hover:shadow-glow">
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                      <p className="text-lg font-semibold">{planName}</p>
                      <div className="text-right">
                          <p className="text-2xl font-bold">{isTopUp ? topUpAmount : plan.priceString}</p>
                          {!isTopUp && <p className="text-sm text-muted-foreground">{plan.duration}</p>}
                      </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-2 border-t">
                      <div className="font-semibold mb-2 text-foreground">Features Included:</div>
                      <ul className="space-y-1">
                        {plan.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 3 && (
                          <li className='text-xs'>+ {plan.features.length - 3} more features</li>
                        )}
                      </ul>
                  </div>
                  {plan.bonus && (
                    <div className="pt-4 border-t">
                      <div className="p-3 bg-primary/5 border-l-4 border-primary/50 rounded-r-md flex items-start gap-3">
                          <Gift className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <p className="text-sm">
                            <span className="font-bold text-primary">{plan.bonus.split(':')[0]}:</span>
                            <span className="text-muted-foreground ml-1">
                              {plan.bonus.split(':')[1]}
                            </span>
                          </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl overflow-hidden">
                  <CardHeader>
                      <div className='flex justify-between items-center flex-wrap gap-2'>
                          <CardTitle className="text-xl flex items-center gap-2">
                              <Wallet className="h-6 w-6 text-primary"/>
                              <span>Payment Instructions</span>
                          </CardTitle>
                          <Button variant="outline" size="sm" asChild className="group">
                              <Link href={`/payment/select?plan=${encodeURIComponent(planName)}`}>
                                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                  Change Crypto
                              </Link>
                          </Button>
                      </div>
                      {selectedCrypto && <CardDescription>Pay with {selectedCrypto.name}</CardDescription>}
                  </CardHeader>
                  <CardContent className="space-y-6">
                      {selectedCrypto ? (
                          <div className='space-y-4'>
                              <div className="border bg-background rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                  <p className="text-sm font-medium text-muted-foreground">Amount to Send</p>
                                  <Button variant="ghost" size="sm" onClick={() => fetchPrices(true)} disabled={isPriceLoading} className="text-xs h-auto py-1 px-2">
                                    <RefreshCw className={`h-3 w-3 mr-2 ${isPriceLoading ? 'animate-spin' : ''}`}/>
                                    Refresh
                                  </Button>
                                </div>
                                <div className="h-8 flex items-center">
                                  <AnimatePresence mode="wait">
                                    {isPriceLoading ? (
                                      <motion.div key="loader" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-full">
                                        <Skeleton className="h-6 w-3/5 animate-pulse" />
                                      </motion.div>
                                    ) : cryptoAmountString && currentPrice ? (
                                      <motion.div
                                        key="price"
                                        className="flex items-center gap-2 w-full justify-between"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                      >
                                        <span className="font-mono text-base text-primary font-bold tracking-tighter">
                                          {cryptoAmountString} {selectedCrypto.symbol}
                                        </span>
                                        <motion.button
                                          onClick={() => copyToClipboard(cryptoAmountString, 'amount')}
                                          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                                          whileTap={{ scale: 0.9 }}
                                          aria-label="Copy crypto amount"
                                        >
                                          <AnimatePresence mode="wait">
                                            {isAmountCopied ? (
                                              <motion.div key="check" initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.5, opacity:0}}>
                                                <Check className="h-5 w-5 text-green-500" />
                                              </motion.div>
                                            ) : (
                                              <motion.div key="copy" initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.5, opacity:0}}>
                                                <Copy className="h-5 w-5" />
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </motion.button>
                                      </motion.div>
                                    ) : (
                                      <p className="text-sm text-destructive">Could not load price. Please refresh.</p>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                                <div className="md:col-span-3 space-y-4">
                                {selectedCrypto.networks.map(networkKey => {
                                    const { network, address } = addresses[networkKey] || {};
                                    return (
                                        <div key={networkKey} className="group relative bg-muted/50 rounded-lg p-4 transition-all duration-300 hover:bg-muted/80 hover:shadow-md">
                                            <p className="text-sm text-muted-foreground mb-1">{network}</p>
                                            <div className="flex items-center gap-2">
                                                <p className="font-mono text-sm sm:text-base break-all text-foreground flex-1">{address || 'Address not available'}</p>
                                                <motion.button
                                                  onClick={() => copyToClipboard(address, 'address')}
                                                  className="self-center flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                                                  whileTap={{ scale: 0.9 }}
                                                  aria-label="Copy wallet address"
                                                  disabled={!address || address === 'Address not available'}
                                                >
                                                  <AnimatePresence mode="wait">
                                                    {isAddressCopied ? (
                                                      <motion.div key="check-addr" initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.5, opacity:0}}>
                                                        <Check className="h-5 w-5 text-green-500" />
                                                      </motion.div>
                                                    ) : (
                                                      <motion.div key="copy-addr" initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.5, opacity:0}}>
                                                        <Clipboard className="h-5 w-5" />
                                                      </motion.div>
                                                    )}
                                                  </AnimatePresence>
                                                </motion.button>
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                                {qrCodeUrl && (
                                  <motion.div 
                                    className="md:col-span-2 flex flex-col items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                  >
                                    <div className="p-3 bg-muted/30 rounded-lg border shadow-inner transition-all duration-300 hover:shadow-xl hover:scale-105">
                                      <Image
                                          src={qrCodeUrl}
                                          alt={`${selectedCrypto.name} QR Code`}
                                          width={180}
                                          height={180}
                                          className="rounded-lg"
                                          data-ai-hint="qr code"
                                      />
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                          </div>
                      ) : (
                          <div className="text-center py-8">
                              <p className="text-muted-foreground mb-4">No cryptocurrency selected.</p>
                              <Button asChild>
                                   <Link href={`/payment/select?plan=${encodeURIComponent(planName)}`}>
                                      Choose Payment Method
                                   </Link>
                              </Button>
                          </div>
                      )}

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-4 mt-4">
                        <h4 className="font-bold text-primary">Important Instructions:</h4>
                        <ul className="space-y-3">
                          {instructions.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                              <span className="text-sm text-muted-foreground">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                         {cryptoKey === 'xrp' && (
                          <p className="text-sm text-muted-foreground pl-8 pt-2 border-t border-primary/10">Note: For XRP, a destination tag is not required.</p>
                        )}
                        {cryptoKey === 'ton' && (
                          <p className="text-sm text-muted-foreground pl-8 pt-2 border-t border-primary/10">Note: For TON, a memo/comment is not required if sending from a private wallet. If sending from an exchange, a memo may be required.</p>
                        )}
                      </div>

                      <Button size="lg" className="w-full text-lg py-6 group" asChild>
                        <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer" aria-label="Contact admin on Telegram to confirm payment">
                            Contact Admin on Telegram
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </Button>
                  </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    