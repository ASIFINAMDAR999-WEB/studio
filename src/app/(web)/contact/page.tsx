
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Bot, HelpCircle, Send } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact for Call Spoofing | REDArmor 2.0',
  description: 'Contact our admin on Telegram for support with our call spoofing services. Get help with payments, setup, or any questions you have.',
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
            className="absolute inset-0 z-0 opacity-40 dark:opacity-50"
            style={{
              background: `radial-gradient(600px circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 80%)`,
            }}
          />
          <div className="text-center mb-16 animate-fade-in-up relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We're here to help with any questions you may have. For direct support, please contact our admin on Telegram.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
             {/* Primary Contact Card */}
             <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col border-primary/30 hover:border-primary/50">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-3">
                           <Send className="w-7 h-7 text-primary" />
                           Direct Support
                        </CardTitle>
                        <CardDescription>
                            The primary and most reliable way to reach our admin for support.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-center items-center text-center space-y-6">
                        <Image 
                            src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-19_15-31-41-904.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE5XzE1LTMxLTQxLTkwNC5wbmciLCJpYXQiOjE3NTU1OTc4MDksImV4cCI6MjA3MDk1NzgwOX0.cSNWar3ZIpoqTpmQIxu_wgrdtOBenau7oMiL72ubNFU"
                            alt="Telegram Icon"
                            width={80}
                            height={80}
                            className="transition-transform duration-300 hover:scale-110"
                            data-ai-hint="social media icon"
                        />
                        <div className='text-center'>
                            <p className='font-semibold text-lg text-foreground'>Telegram</p>
                            <p className="text-lg text-muted-foreground font-mono tracking-tight">@AF3092</p>
                        </div>
                        <Button size="lg" className="w-full text-lg py-6 group" asChild>
                           <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">
                            Contact on Telegram
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                           </a>
                        </Button>
                    </CardContent>
                </Card>
             </div>

             {/* Secondary Resources Card */}
             <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                 <Card className="shadow-lg h-full bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-2xl">Before You Contact</CardTitle>
                        <CardDescription>
                            You might find a quick answer in our resources below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                                  <p className="text-sm text-muted-foreground">For automated services or if one bot is down, you can find our list of official Telegram bots here.</p>
                              </div>
                           </div>
                        </Link>
                    </CardContent>
                 </Card>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
