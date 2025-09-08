
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Bot, HelpCircle, Send, User, Mail, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
            className="absolute inset-0 z-0 opacity-40 dark:opacity-50"
            style={{
              background: `radial-gradient(800px circle at 50% 20%, hsl(var(--primary) / 0.1), transparent 70%)`,
            }}
          />
          <div className="text-center mb-16 animate-fade-in-up relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We're here to help. For the fastest response, contact our admin on Telegram. For other inquiries, use the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto relative z-10">
             {/* Primary Contact Card */}
             <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col border-primary/30 hover:border-primary/50">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-3">
                           <Send className="w-7 h-7 text-primary" />
                           Direct Support
                        </CardTitle>
                        <CardDescription>
                            The fastest way to reach our admin for support and sales.
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

             {/* Secondary Contact Form */}
             <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                 <Card className="shadow-lg h-full bg-card/80 backdrop-blur-sm p-4 sm:p-8">
                    <CardHeader className="p-2 sm:p-4 pt-0">
                        <CardTitle className="text-2xl">Send a Message</CardTitle>
                        <CardDescription>
                            For non-urgent inquiries, fill out the form below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4 pt-0">
                      <form action="#" className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <Label htmlFor="name" className="flex items-center gap-2"><User className="w-4 h-4" /> Your Name</Label>
                              <Input id="name" type="text" placeholder="John Doe" required />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> Your Email</Label>
                              <Input id="email" type="email" placeholder="you@example.com" required />
                           </div>
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor="message" className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Message</Label>
                           <Textarea id="message" placeholder="Please describe your question or issue in detail..." required rows={5}/>
                         </div>
                         <Button type="submit" size="lg" className="w-full text-lg py-6 group">
                            Send Message
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                         </Button>
                      </form>
                    </CardContent>
                 </Card>
             </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Card className="bg-muted/30">
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
