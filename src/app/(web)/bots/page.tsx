
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Terminal, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Telegram Bots | REDArmor v0.2',
  description: 'Access our list of official REDArmor Telegram bots for support and services. Find an active bot to connect with us.',
};

const bots = [
  { name: '@Callspoofing0499_bot', url: 'https://t.me/Callspoofing0499_bot' },
  { name: '@Callspoofing2025bot', url: 'https://t.me/Callspoofing2025bot' },
  { name: '@Callspoofing0011_bot', url: 'https://t.me/Callspoofing0011_bot' },
  { name: '@Callspoofing_202526bot', url: 'https://t.me/Callspoofing_202526bot' },
  { name: '@Callspoofingotpbot', url: 'https://t.me/Callspoofingotpbot' },
  { name: '@Callspoofingglobe_bot', url: 'https://t.me/Callspoofingglobe_bot' },
  { name: '@Call_spoofingbot', url: 'https://t.me/Call_spoofingbot' },
];

export default function BotsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="relative container mx-auto px-4 sm:px-6 py-16 md:py-24">
           <div 
            className="absolute inset-0 z-0 opacity-40 dark:opacity-50"
            style={{
              background: `radial-gradient(600px circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 80%)`,
            }}
          />
          <div className="text-center mb-12 animate-fade-in-up relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Our Telegram Bots
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with our automated services through our official bots.
            </p>
          </div>

          <div className="max-w-xl mx-auto relative z-10">
            <div 
              className="animate-fade-in-up rounded-xl p-px group transition-all duration-300 hover:bg-primary/20"
              style={{ animationDelay: '200ms' }}
            >
              <Card className="shadow-lg transition-all duration-300 group-hover:shadow-2xl h-full w-full bg-card">
                  <CardHeader>
                      <CardTitle className="text-2xl">Official Bot List</CardTitle>
                      <CardDescription>
                          Click a link to start a chat with one of our bots.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      {bots.map((bot, index) => (
                         <a 
                            key={index} 
                            href={bot.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-4 group/link p-4 rounded-lg transition-colors hover:bg-muted"
                          >
                            <Terminal className="h-6 w-6 text-primary transition-transform duration-300 group-hover/link:scale-110" />
                            <p className="font-mono text-base text-muted-foreground group-hover/link:text-primary transition-colors">
                                {bot.name}
                            </p>
                        </a>
                      ))}
                      <div className="!mt-6 bg-amber-500/10 border-l-4 border-amber-500 text-amber-700 dark:text-amber-400 p-4 rounded-md" role="alert">
                        <div className="flex">
                            <AlertTriangle className="h-5 w-5 mr-3" />
                            <div>
                                <p className="font-bold">Important Notice</p>
                                <p className="text-sm">If one bot is banned or unavailable, please try another from the list.</p>
                            </div>
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
