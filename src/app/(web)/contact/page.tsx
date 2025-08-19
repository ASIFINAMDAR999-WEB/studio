
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact for Call Spoofing | REDArmor 2.0',
  description: 'Contact our admin on Telegram for support with our call spoofing services. Get help with payments, setup, or any questions you have.',
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
          <div className="text-center mb-12 animate-fade-in-up relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help with any questions you may have. You can reach our admin on Telegram.
            </p>
          </div>

          <div className="max-w-lg mx-auto relative z-10">
            <div 
              className="animate-fade-in-up rounded-xl p-px group transition-all duration-300 hover:bg-primary/20"
              style={{ animationDelay: '200ms' }}
            >
              <Card className="shadow-lg transition-all duration-300 group-hover:shadow-2xl h-full w-full bg-card">
                  <CardHeader>
                      <CardTitle className="text-2xl">Contact Information</CardTitle>
                      <CardDescription>
                          The primary and most reliable way to reach us.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                       <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/link p-4 rounded-lg transition-colors hover:bg-muted">
                          <Image 
                            src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-19_15-31-41-904.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE5XzE1LTMxLTQxLTkwNC5wbmciLCJpYXQiOjE3NTU1OTc4MDksImV4cCI6MjA3MDk1NzgwOX0.cSNWar3ZIpoqTpmQIxu_wgrdtOBenau7oMiL72ubNFU"
                            alt="Telegram Icon"
                            width={32}
                            height={32}
                            className="transition-transform duration-300 group-hover/link:scale-110"
                          />
                          <div className='text-muted-foreground group-hover/link:text-primary transition-colors'>
                              <p className='font-semibold text-lg'>Telegram</p>
                              <p className="text-base">@AF3092</p>
                          </div>
                      </a>
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                          <div>
                              <p className='font-semibold text-foreground'>Support Availability</p>
                              <p className="text-sm text-muted-foreground">Our support team is available across different time zones to assist you. While we aim for quick responses, please allow for some time for us to get back to you.</p>
                          </div>
                      </div>
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
