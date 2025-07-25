import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Send } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | REDArmor v0.2',
  description: 'Get in touch with the REDArmor team. Contact our admin on Telegram for support, sales, and any inquiries you may have.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help with any questions you may have. You can reach our admin on Telegram.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                 <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Contact Information</CardTitle>
                        <CardDescription>
                            The primary way to reach us.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                            <Send className="h-6 w-6 text-primary" />
                            <div className='text-muted-foreground group-hover:text-primary transition-colors'>
                                <p className='font-semibold'>Telegram</p>
                                <p>@AF3092</p>
                            </div>
                        </a>
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
