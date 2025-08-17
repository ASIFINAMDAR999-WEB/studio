
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Telegram Bots | CallCraft',
  description: 'Access our list of official CallCraft Telegram bots for support and services. Find an active bot to connect with us.',
  alternates: {
    canonical: 'https://www.callspoofing.shop/bots',
  },
};

const bots = [
    { name: '@nexuscallss_bot', url: 'https://t.me/nexuscallss_bot' },
    { name: '@Callspoofing0499_bot', url: 'https://t.me/Callspoofing0499_bot' },
    { name: '@Callspoofterbotbot', url: 'https://t.me/Callspoofterbotbot' },
    { name: '@Callspoofing6162bot', url: 'https://t.me/Callspoofing6162bot' },
    { name: '@Nexuscallbotbot', url: 'https://t.me/Nexuscallbotbot' },
    { name: '@Nexusspoofingbot', url: 'https://t.me/Nexusspoofingbot' },
    { name: '@Nexuscallspoofingbot', url: 'https://t.me/Nexuscallspoofingbot' },
    { name: '@Mexicocallspoofingactivebot', url: 'https://t.me/Mexicocallspoofingactivebot' },
    { name: '@Spoofcallbot_bot', url: 'https://t.me/Spoofcallbot_bot' },
    { name: '@Callspoofbotbot', url: 'https://t.me/Callspoofbotbot' },
    { name: '@Callspoofingbotofficialbot', url: 'https://t.me/Callspoofingbotofficialbot' },
    { name: '@Spoofcall_0499bot', url: 'https://t.me/Spoofcall_0499bot' },
    { name: '@Callspoofing001_bot', url: 'https://t.me/Callspoofing001_bot' },
    { name: '@Spoofcallbotbot', url: 'https://t.me/Spoofcallbotbot' },
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
        <div className="relative container mx-auto px-4 sm:px-6 py-20 md:py-28">
           <div 
            className="absolute inset-0 z-0 opacity-40 dark:opacity-50"
            style={{
              background: `radial-gradient(600px circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 80%)`,
            }}
          />
          <div className="text-center mb-16 animate-fade-in-up relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Our Telegram Bots
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Connect with our automated services through our official bots. Click any bot to start a chat on Telegram for support or to access our services.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bots.map((bot, index) => (
               <div 
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="group h-full flex flex-col justify-between overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 border hover:border-primary/50">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                           <Image src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-16_11-58-07-414.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE2XzExLTU4LTA3LTQxNC5wbmciLCJpYXQiOjE3NTUzMjYxMjUsImV4cCI6MjA3MDY4NjEyNX0.HrqwzcCFG0oUt0HEewn9XZC4jXJhrWc_sLq1YGqStqE" alt="CallCraft Logo" width={40} height={40} className="rounded-full" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-mono tracking-tighter">{bot.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                      <a 
                        href={bot.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full"
                      >
                         <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                           Start Chat
                           <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                         </Button>
                       </a>
                    </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-16 animate-fade-in-up" style={{animationDelay: '300ms'}}>
             <div className="bg-amber-500/10 border-l-4 border-amber-500 text-amber-700 dark:text-amber-400 p-4 rounded-md" role="alert">
                <div className="flex">
                    <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                        <p className="font-bold">Important Notice</p>
                        <p className="text-sm">If one bot is banned or unavailable, please try another from the list above. Our services remain active across multiple bots for redundancy.</p>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
