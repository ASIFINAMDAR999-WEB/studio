
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Bot, HelpCircle, Send } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact for Callspoofing & VoIP Support | REDArmor 2.0',
  description: 'Contact our admin on Telegram for support with our professional callspoofing, VoIP, and SIP trunk services. Get help with payments, setup, or any questions.',
  alternates: {
    canonical: 'https://www.callspoofing.shop/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="relative container mx-auto px-4 sm:px-6 py-20 md:py-28">
           <div 
            className="absolute inset-0 z-0 opacity-50 dark:opacity-60"
            style={{
              background: `radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`,
            }}
          />
           <div className="absolute inset-0 bg-grid-pattern-small opacity-20 dark:opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)] -z-10"></div>

          <div className="text-center mb-16 animate-fade-in-up relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We're here to help. For the fastest response, please contact our admin on Telegram.
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative z-10">
             <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <Card className="shadow-lg hover:shadow-glow transition-all duration-500 bg-card/80 backdrop-blur-sm border hover:border-primary">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl flex items-center justify-center gap-3">
                           <Send className="w-7 h-7 text-primary" />
                           Direct Support Channel
                        </CardTitle>
                        <CardDescription>
                            The fastest way to reach our admin for support and sales.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center text-center space-y-6 pt-0 pb-8">
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
                            <p className="text-lg text-muted-foreground font-mono tracking-tight bg-muted px-3 py-1 rounded-md">@AF3092</p>
                        </div>
                        <Button size="lg" className="w-full text-lg py-7 group" asChild>
                           <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">
                            Contact on Telegram
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                           </a>
                        </Button>
                    </CardContent>
                </Card>
             </div>
          </div>

          <div className="max-w-3xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Card className="bg-card/80 backdrop-blur-sm border hover:border-transparent transition-colors duration-300 hover:border-primary/30">
              <CardHeader>
                <CardTitle className="text-xl">Looking for Quick Answers?</CardTitle>
                <CardDescription>Check our resources before reaching out. You might find what you need instantly.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/#faq" passHref>
                    <div className="group flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-background cursor-pointer">
                        <HelpCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1 transition-transform group-hover:rotate-12" />
                        <div>
                            <p className='font-semibold text-foreground text-lg'>Check our FAQ</p>
                            <p className="text-sm text-muted-foreground">Find answers to common questions about payments, legality, and how to get started.</p>
                        </div>
                    </div>
                  </Link>
                  <Link href="/bots" passHref>
                    <div className="group flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-background cursor-pointer">
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
