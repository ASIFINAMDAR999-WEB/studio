import { PlanRecommender } from '@/components/plan-recommender';
import { PlanCard } from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Send, Coins, ShieldAlert, Video } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Silver Plans',
    priceString: '$50 - $500',
    duration: 'Manual top-up',
    description: 'Pay as you go. Prices: $50, $100, $250, $500.',
    features: ["Manual top-up via @AF3092", "Only for virtual number's and esim"],
    highlight: false,
    cta: 'Contact Admin',
    ctaLink: 'https://t.me/AF3092',
  },
  {
    name: 'Gold Plan',
    priceString: '$90',
    duration: '1 Month',
    description: 'Unlimited Calling — no per-minute charges',
    features: [
      'Full Call Spoofing Access',
      'Standard Voice Changer',
      'Website & Application Access',
    ],
    highlight: false,
    cta: 'Get Gold',
    ctaLink: 'https://t.me/AF3092',
  },
  {
    name: 'Diamond Plan',
    priceString: '$200',
    duration: '2 Months',
    description: 'Unlimited Calling — no per-minute charges',
    features: [
      'Advanced Call Spoofing',
      'Premium Voice Changer',
      'Enhanced Call Routing',
      'Advance Otp bot Access',
      'Website & Application Access',
      'Email & SMS Spoofing Access',
      'IVR System',
      'Toll-Free Number Spoofing',
      'SIP Trunk Access (inbound & outbound)',
    ],
    highlight: true,
    cta: 'Get Diamond',
    ctaLink: 'https://t.me/AF3092',
  },
  {
    name: 'Platinum 1-Month Plan',
    priceString: '$100',
    duration: '1 Month',
    description: 'Unlimited Calling — For New Clients Only',
    features: [
        'Advanced Call Spoofing',
        'Premium Voice Changer',
        'Enhanced Routing',
        'Priority Support',
        'Advance Otp bot Access',
        'Website & Application Access',
        'Email & SMS Spoofing Access',
        'IVR System',
        'Premium Toll-Free Number Spoofing',
        'Premium SIP Trunk Access (inbound & outbound)',
    ],
    highlight: false,
    isSpecialOffer: true,
    cta: 'Get Offer',
    ctaLink: 'https://t.me/AF3092',
  },
  {
    name: 'Platinum Plan',
    priceString: '$300',
    duration: '3 Months',
    description: 'Unlimited Calling — Includes all premium features',
    features: [
      'Advanced Call Spoofing',
      'Premium Voice Changer',
      'Enhanced Routing',
      'Priority Support',
      'Advance Otp bot Access',
      'Full API & Custom Integration',
      'Website & Application Access',
      'Email & SMS Spoofing Access',
      'IVR System',
      'Premium Toll-Free Number Spoofing',
      'Premium SIP Trunk Access (inbound & outbound)',
    ],
    highlight: false,
    cta: 'Get Platinum',
    ctaLink: 'https://t.me/AF3092',
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <Crown className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold font-headline text-primary">CallCraft</span>
          </Link>
          <Button asChild>
            <Link href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">
              <Send className="mr-2 h-4 w-4" /> Contact Admin
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="text-center py-16 md:py-24 bg-card">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              👑 TOP-UP PLANS 👑
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
              Choose from our range of powerful top-up plans designed for ultimate flexibility and performance.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="#plans">View Plans</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="recommender" className="py-16 md:py-24">
          <div className="container px-4">
            <PlanRecommender />
          </div>
        </section>

        <section id="plans" className="py-16 md:py-24 bg-card">
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Choose Your Perfect Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>

        <section id="notes" className="py-16 md:py-24">
          <div className="container px-4">
            <Card className="max-w-3xl mx-auto shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <ShieldAlert className="h-6 w-6 text-primary" />
                  Important Notes
                </CardTitle>
                <CardDescription>
                  Please read these points carefully before making a purchase.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Coins className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span><strong>We only accept Crypto payment.</strong> All transactions are secure and private.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Send className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span><strong>Manual top-up required.</strong> Please contact our admin for all top-ups.
                      <Button variant="link" asChild className="p-1 h-auto -ml-1">
                        <Link href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">Admin: @AF3092</Link>
                      </Button>
                    </span>
                  </li>
                   <li className="flex items-start gap-3">
                    <Video className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span>
                      <strong>Demo videos available.</strong> Watch demos on our official channel.
                      <Button variant="link" asChild className="p-1 h-auto -ml-1">
                        <Link href="https://t.me/+Eg-SFpyzbpM0YzM1" target="_blank" rel="noopener noreferrer">
                          Watch Demos
                        </Link>
                      </Button>
                    </span>
                  </li>
                   <li className="flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 text-destructive mt-1 shrink-0" />
                    <span><strong>No free trials available.</strong> We encourage you to watch the demo videos to see the service in action.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 text-destructive mt-1 shrink-0" />
                    <span className="font-semibold text-destructive-foreground/80">
                      Please do not use the top-up section inside our spoofing bot, as that service has been discontinued. We are not responsible for any losses resulting from attempts to use the old top-up method.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t bg-card/80">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} CallCraft. All rights reserved.</p>
          <p className="mt-2">For instant and secure top-ups, contact admin <Link href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@AF3092</Link></p>
        </div>
      </footer>
    </div>
  );
}
