

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Clipboard, Wallet, AlertTriangle, Send, ShieldCheck, ArrowLeft, PenSquare, Gift, Copy, RefreshCw, Tag, X, Clock } from 'lucide-react';
import { plans, cryptoDetails } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '../ui/input';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1500; // in ms
const REFRESH_INTERVAL_SECONDS = 20 * 60; // 20 minutes

export function PaymentPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planName = searchParams.get('plan') || 'Platinum Plan';
  const cryptoKey = searchParams.get('crypto');
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isPriceLoading, setIsPriceLoading] = useState(true);
  const [isAmountCopied, setIsAmountCopied] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL_SECONDS);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCouponApplied, setIsCouponApplied] = useState(false);


  const fetchPrices = useCallback(async () => {
    setIsPriceLoading(true);
    const apiIds = [...new Set(Object.values(cryptoDetails).map(c => c.apiId))].join(',');
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(`/api/crypto-prices?ids=${apiIds}`);
        if (!response.ok) {
          throw new Error(`API proxy request failed with status ${response.status}`);
        }
        const data = await response.json();
        const newPrices: Record<string, number> = {};
        
        for (const id of apiIds.split(',')) {
            if (data[id] && data[id].usd) {
                newPrices[id] = data[id].usd;
            }
        }
        
        if (Object.keys(newPrices).length === 0) {
           throw new Error("No prices returned from API proxy.");
        }

        setPrices(newPrices);
        setIsPriceLoading(false);
        setCountdown(REFRESH_INTERVAL_SECONDS); // Reset countdown on successful fetch
        return; // Success, exit the loop
      } catch (error) {
        console.error(`Attempt ${attempt} to fetch crypto prices failed:`, error);
        if (attempt === MAX_RETRIES) {
          setIsPriceLoading(false);
          toast({
            title: "Error Loading Prices",
            description: "Could not load live crypto rates. Please check your connection and try refreshing.",
            variant: "destructive",
          });
        } else {
          await new Promise(res => setTimeout(res, RETRY_DELAY));
        }
      }
    }
  }, [toast]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          fetchPrices();
          return REFRESH_INTERVAL_SECONDS;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [fetchPrices]);

  useEffect(() => {
    document.title = `Payment for ${planName} | REDArmor 2.0`;
  }, [planName]);

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const isTopUp = planName.includes('Silver Plan');
  const topUpAmount = isTopUp ? planName.split(' - ')[1] : null;

  const basePlanName = isTopUp ? planName.split(' - ')[0] : planName;
  const plan = plans.find((p) => p.name === basePlanName) || plans[0];
  
  const planUsdPrice = parseFloat((topUpAmount || plan.priceString).replace('$', ''));

  const handleApplyCoupon = () => {
    setCouponError(null);
    if (couponCode.toUpperCase() === 'MAX2026' && planName === 'Platinum Max Plan') {
        setDiscount(0.26); // 26% discount
        setIsCouponApplied(true);
        toast({
            title: "🎉 Coupon Applied! 🎉",
            description: "You've successfully unlocked a 26% New Year discount!",
        });
    } else if (couponCode.toUpperCase() === 'MAX2026' && planName !== 'Platinum Max Plan') {
        setDiscount(0);
        setIsCouponApplied(false);
        setCouponError("This coupon is only valid for the Platinum Max Plan.");
        toast({
            title: "Invalid Coupon",
            description: "This coupon is only valid for the Platinum Max Plan.",
            variant: "destructive",
        });
    } else {
        setDiscount(0);
        setIsCouponApplied(false);
        setCouponError("Invalid coupon code.");
        toast({
            title: "Invalid Coupon",
            description: "The coupon code you entered is not valid.",
            variant: "destructive",
        });
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setIsCouponApplied(false);
    setCouponCode('');
    setCouponError(null);
    toast({
        title: "Coupon Removed",
        description: "The discount has been removed from your order.",
    });
  };


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
  
  const selectedCrypto = cryptoKey ? cryptoDetails[cryptoKey] : null;
  const qrCodeUrl = selectedCrypto?.qrCode;
  const currentPrice = selectedCrypto ? prices[selectedCrypto.apiId] : undefined;

  const isStablecoin = cryptoKey?.startsWith('usdt') || cryptoKey?.startsWith('usdc');
  const baseUsdPrice = isStablecoin ? planUsdPrice : planUsdPrice + 5; // $5 fee for non-stablecoins
  const discountedUsdPrice = baseUsdPrice * (1 - discount);
  const cryptoAmount = (currentPrice && planUsdPrice) ? (discountedUsdPrice / currentPrice) : undefined;

  const cryptoAmountString = cryptoAmount?.toFixed(selectedCrypto?.precision || 8);


  const instructions = [
    { icon: <AlertTriangle className="h-5 w-5 text-primary" />, text: <>Send the <span className="font-bold text-foreground">EXACT amount</span> to the address provided. Do NOT send from an exchange that doesn't support the specified network.</> },
    { icon: <PenSquare className="h-5 w-5 text-primary" />, text: "After paying, take a screenshot of the transaction confirmation." },
    { icon: <Send className="h-5 w-5 text-primary" />, text: <>Send the screenshot to our admin on Telegram: <a href="https://t.me/CSG555" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:underline">@CSG555</a></> },
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, text: "Your plan will be activated within 5-10 minutes after we confirm the payment." },
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
              <Card className="shadow-glow border-l-4 border-primary transition-all duration-300">
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
                   {isCouponApplied && (
                    <motion.div 
                      className="flex justify-between items-center text-sm text-green-600 dark:text-green-400 border-t pt-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="font-semibold">Coupon Applied (26% OFF)</p>
                        <p className="font-bold">- ${((isStablecoin ? planUsdPrice : planUsdPrice + 5) * discount).toFixed(2)}</p>
                    </motion.div>
                   )}
                   {discount > 0 && (
                    <motion.div 
                      className="flex justify-between items-center border-t pt-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-lg font-semibold">New Total</p>
                      <p className="text-2xl font-bold text-primary">${discountedUsdPrice.toFixed(2)}</p>
                    </motion.div>
                   )}

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
                <Card className="relative overflow-hidden bg-gradient-to-br from-card to-muted/30 border-primary/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Tag className="h-6 w-6 text-primary"/>
                            Have a Coupon?
                        </CardTitle>
                        <CardDescription>Enter your code to apply a discount.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AnimatePresence mode="wait">
                        {isCouponApplied ? (
                          <motion.div
                            key="applied"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30"
                          >
                            <div className="flex items-center gap-2">
                              <Check className="h-5 w-5 text-green-600" />
                              <p className="font-semibold text-green-700 dark:text-green-400">
                                Coupon 'MAX2026' Applied!
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-green-700 dark:text-green-400 hover:bg-green-500/20">
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex gap-2 items-start"
                          >
                            <div className="relative flex-grow">
                              <motion.input
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => {
                                    setCouponCode(e.target.value);
                                    if(couponError) setCouponError(null);
                                }}
                                disabled={isCouponApplied}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow duration-300 focus:shadow-md focus:shadow-primary/20"
                                initial={{ width: '100%' }}
                                animate={{ borderColor: couponError ? 'hsl(var(--destructive))' : 'hsl(var(--input))' }}
                              />
                              <AnimatePresence>
                                {couponError && (
                                  <motion.p
                                    className="text-xs text-destructive mt-1"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                  >
                                    {couponError}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                            <motion.div whileTap={{ scale: 0.95 }}>
                              <Button onClick={handleApplyCoupon} disabled={!couponCode || isCouponApplied} className="transition-all duration-300 group h-10">
                                <>
                                  Apply
                                  <ArrowLeft className="h-4 w-4 ml-2 transform -rotate-180 transition-transform group-hover:-translate-x-1" />
                                </>
                              </Button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                          <div className='flex items-center gap-2'>
                                <Button variant="outline" size="sm" asChild className="group">
                                    <Link href={`/payment/select?plan=${encodeURIComponent(planName)}`}>
                                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                        Change Method
                                    </Link>
                                </Button>
                           </div>
                      </div>
                      {selectedCrypto && <CardDescription>Pay with {selectedCrypto.displayName}</CardDescription>}
                  </CardHeader>
                  <CardContent className="space-y-6">
                      {selectedCrypto ? (
                          <div className='space-y-4'>
                              <div className="border bg-background rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                  <p className="text-sm font-medium text-muted-foreground">Amount to Send</p>
                                   <div className="flex items-center gap-2 text-xs text-primary">
                                      <AnimatePresence mode="wait">
                                        {isPriceLoading ? (
                                          <motion.div key="loader-icon" initial={{opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.7}} >
                                            <RefreshCw className="h-3 w-3 animate-spin" />
                                          </motion.div>
                                        ) : (
                                          <motion.div key="clock-icon" initial={{opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.7}} >
                                            <Clock className="h-3 w-3" />
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                       <span
                                          className="w-24 text-left font-medium"
                                        >
                                          {isPriceLoading ? "Fetching..." : `Refresh ${formatCountdown(countdown)}`}
                                        </span>
                                  </div>
                                </div>
                                <div className="h-8 flex items-center">
                                  <AnimatePresence mode="wait">
                                    {isPriceLoading ? (
                                      <motion.div key="loader" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-full">
                                        <Skeleton className="h-6 w-3/5" />
                                      </motion.div>
                                    ) : cryptoAmountString && currentPrice ? (
                                      <motion.div
                                        key="price"
                                        className="flex items-center gap-2 w-full justify-between"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                      >
                                        <span className="font-mono text-base text-green-500 font-bold tracking-tighter">
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
                                  <div className="group relative bg-muted/50 rounded-lg p-4 transition-all duration-300 hover:bg-muted/80 hover:shadow-md">
                                      <p className="text-sm text-muted-foreground mb-1">{selectedCrypto.networkName}</p>
                                      <div className="flex items-center gap-2">
                                          <p className="font-mono text-sm sm:text-base break-all text-green-500 flex-1">{selectedCrypto.address || 'Address not available'}</p>
                                          <motion.button
                                            onClick={() => copyToClipboard(selectedCrypto.address, 'address')}
                                            className="self-center flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                                            whileTap={{ scale: 0.9 }}
                                            aria-label="Copy wallet address"
                                            disabled={!selectedCrypto.address || selectedCrypto.address === 'Address not available'}
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
                                          alt={`${selectedCrypto.displayName} QR Code`}
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

                      <motion.div 
                        className="p-6 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 space-y-4"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="font-bold text-lg text-primary text-center">How to Complete Your Payment</h4>
                        <ol className="space-y-3">
                          {instructions.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5 text-primary font-bold text-lg">{index + 1}.</div>
                              <span className="text-sm text-muted-foreground">{item.text}</span>
                            </li>
                          ))}
                        </ol>
                         {cryptoKey === 'xrp' && (
                          <p className="text-sm text-muted-foreground pl-8 pt-2 border-t border-primary/10">Note: For XRP, a destination tag is not required.</p>
                        )}
                        {cryptoKey === 'ton' && (
                          <p className="text-sm text-muted-foreground pl-8 pt-2 border-t border-primary/10">Note: For TON, a memo/comment is not required if sending from a private wallet. If sending from an exchange, a memo may be required.</p>
                        )}
                      </motion.div>

                      <Button size="lg" className="w-full text-lg py-6 group" asChild>
                        <a href="https://t.me/CSG555" target="_blank" rel="noopener noreferrer" aria-label="Contact admin on Telegram to confirm payment">
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
