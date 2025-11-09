
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Bot, HelpCircle, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactPage() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28">
           <div 
            className="absolute inset-0 z-0 opacity-50 dark:opacity-60"
            style={{
              background: `radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`,
            }}
          />
           <div className="absolute inset-0 bg-grid-pattern-small opacity-20 dark:opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)] -z-10"></div>

          <motion.div 
            className="text-center mb-12 md:mb-16 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Get In Touch
            </h1>
            <p className="mt-4 text-md sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              We're here to help. For the fastest response, please contact our admin on Telegram.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto relative z-10 space-y-12 md:space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
             <motion.div variants={itemVariants}>
                <Card className="shadow-lg shadow-glow transition-all duration-500 bg-card/80 backdrop-blur-sm border border-primary">
                    <CardHeader className="text-center p-6 pb-4 md:p-8 md:pb-4">
                        <CardTitle className="text-2xl flex items-center justify-center gap-3">
                           <Send className="w-7 h-7 text-primary" />
                           Direct Support Channel
                        </CardTitle>
                        <CardDescription className="pt-1">
                            The fastest way to reach our admin for support and sales.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center text-center space-y-6 px-6 pb-6 md:px-8 md:pb-8">
                        <Image 
                            src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-19_15-31-41-904.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE5XzE1LTMxLTQxLTkwNC5wbmciLCJpYXQiOjE3NTU1OTc4MDksImV4cCI6MjA3MDk1NzgwOX0.cSNWar3ZIpoqTpmQIxu_wgrdtOBenau7oMiL72ubNFU"
                            alt="Telegram Icon"
                            width={100}
                            height={100}
                            className="transition-transform duration-300 hover:scale-110"
                            data-ai-hint="social media icon"
                        />
                        <div className='text-center'>
                            <p className='font-semibold text-xl text-foreground'>Telegram</p>
                            <p className="text-md sm:text-lg text-muted-foreground font-mono tracking-tight bg-muted px-3 py-1 rounded-md">@AF3092</p>
                        </div>
                        <Button size="lg" className="w-full text-lg py-6 sm:py-7 group" asChild>
                           <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">
                            Contact on Telegram
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                           </a>
                        </Button>
                    </CardContent>
                </Card>
             </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/30 shadow-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Looking for Quick Answers?</CardTitle>
                  <CardDescription>Check our resources before reaching out. You might find what you need instantly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/#faq" passHref>
                      <div className="group flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-muted cursor-pointer hover:shadow-inner">
                          <HelpCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1 transition-transform group-hover:rotate-12" />
                          <div>
                              <p className='font-semibold text-foreground text-lg'>Check our FAQ</p>
                              <p className="text-sm text-muted-foreground">Find answers to common questions about payments, legality, and how to get started.</p>
                          </div>
                      </div>
                    </Link>
                    <Link href="/bots" passHref>
                      <div className="group flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-muted cursor-pointer hover:shadow-inner">
                          <Bot className="h-8 w-8 text-primary flex-shrink-0 mt-1 transition-transform group-hover:scale-110" />
                          <div>
                              <p className='font-semibold text-foreground text-lg'>Use Our Bots</p>
                              <p className="text-sm text-muted-foreground">For automated services or if one bot is down, find our list of official Telegram bots here.</p>
                          </div>
                      </div>
                    </Link>
                  </div>
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
