
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, CreditCard, Droplets } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function PaymentOptionsComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planName = searchParams.get('plan');

  useEffect(() => {
    if (planName) {
      document.title = `Payment Options for ${planName} | REDArmor 2.0`;
    } else {
      router.replace('/#pricing');
    }
  }, [planName, router]);

  if (!planName) {
    return null; // Or a loading/error state
  }

  const handleSelection = (path: string) => {
    router.push(`${path}?plan=${encodeURIComponent(planName)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 py-8 md:py-16">
        <motion.div
          className="max-w-2xl w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="shadow-2xl bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader className="text-center p-6 md:p-8">
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Choose Your Payment Style
                </CardTitle>
                <CardDescription className="mt-2 text-lg text-muted-foreground">
                  You are purchasing the <span className="font-bold text-primary">{planName}</span>.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="h-full"
                >
                  <div
                    onClick={() => handleSelection('/payment/oxapay')}
                    className="h-full cursor-pointer group flex flex-col p-6 rounded-xl border bg-background/50 transition-all duration-300 hover:border-primary hover:shadow-glow"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-7 w-7 text-primary" />
                      <h3 className="text-xl font-bold">Automatic Payment</h3>
                    </div>
                    <p className="text-muted-foreground mt-2 flex-grow">
                      Pay with a wide range of cryptocurrencies via OxaPay for a streamlined, automatic checkout.
                    </p>
                    <div className="mt-4 font-semibold text-primary flex items-center">
                      Choose Automatic
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="h-full"
                >
                  <div
                    onClick={() => handleSelection('/payment/select')}
                    className="h-full cursor-pointer group flex flex-col p-6 rounded-xl border bg-background/50 transition-all duration-300 hover:border-accent hover:shadow-[0_0_15px_0_hsl(var(--accent)/0.5)]"
                  >
                    <div className="flex items-center gap-3">
                      <Droplets className="h-7 w-7 text-accent" />
                      <h3 className="text-xl font-bold">Manual Crypto</h3>
                    </div>
                    <p className="text-muted-foreground mt-2 flex-grow">
                      Pay directly with your preferred cryptocurrency. Requires manual confirmation with our admin via Telegram.
                    </p>
                    <div className="mt-4 font-semibold text-accent flex items-center">
                      Choose Manual
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
