
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clipboard, Terminal } from 'lucide-react';
import { plans } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function PaymentPageComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';
  const plan = plans.find((p) => p.name === planName) || plans[0];

  const { toast } = useToast()

  const addresses = {
    usdt_trc20: process.env.NEXT_PUBLIC_USDT_TRC20_ADDRESS || '',
    usdt_erc20: process.env.NEXT_PUBLIC_USDT_ERC20_ADDRESS || '',
    usdt_bep20: process.env.NEXT_PUBLIC_USDT_BEP20_ADDRESS || '',
    btc: process.env.NEXT_PUBLIC_BTC_ADDRESS || '',
    eth: process.env.NEXT_PUBLIC_ETH_ADDRESS || '',
    ltc: process.env.NEXT_PUBLIC_LTC_ADDRESS || '',
    xrp: process.env.NEXT_PUBLIC_XRP_ADDRESS || '',
  }

  const copyToClipboard = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Address has been copied to your clipboard.",
      })
    }
  };

  const AddressDisplay = ({ network, address }: { network: string, address: string }) => (
    <div className="bg-muted/50 rounded-lg p-4">
      <p className="text-sm text-muted-foreground mb-1">{network}</p>
      <div className="flex justify-between items-center gap-4">
        <p className="font-mono text-sm sm:text-base break-all">{address}</p>
        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(address)}>
          <Clipboard className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground animate-fade-in-up">
              Complete Your Purchase
            </h1>
            <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
              Follow the steps below to securely complete your payment.
            </p>
          </div>

          <Card className="bg-muted/30 border-l-4 border-primary mb-8 animate-fade-in-up [animation-delay:400ms]">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <Terminal className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">You are paying for: {plan.name}</p>
                  <p className="text-sm text-muted-foreground">Please double-check all details before sending your payment.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-8 animate-fade-in-up [animation-delay:600ms]">
            <div>
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-5xl font-bold">{plan.priceString}</span>
                        <span className="text-xl text-muted-foreground">{plan.duration}</span>
                    </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Payment Instructions</h2>
              <Card className="shadow-lg">
                <CardContent className="pt-6 space-y-6">
                    <Tabs defaultValue="usdt" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-4">
                        <TabsTrigger value="usdt">USDT</TabsTrigger>
                        <TabsTrigger value="btc">BTC</TabsTrigger>
                        <TabsTrigger value="eth">ETH</TabsTrigger>
                        <TabsTrigger value="ltc">LTC</TabsTrigger>
                        <TabsTrigger value="xrp">XRP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="usdt" className="space-y-4">
                        <h3 className="font-bold text-lg">Pay with USDT (Tether)</h3>
                        <AddressDisplay network="TRC-20 (Tron Network)" address={addresses.usdt_trc20} />
                        <AddressDisplay network="ERC-20 (Ethereum Network)" address={addresses.usdt_erc20} />
                        <AddressDisplay network="BEP-20 (Binance Smart Chain)" address={addresses.usdt_bep20} />
                      </TabsContent>
                      <TabsContent value="btc">
                        <h3 className="font-bold text-lg mb-2">Pay with Bitcoin (BTC)</h3>
                        <AddressDisplay network="Bitcoin Network" address={addresses.btc} />
                      </TabsContent>
                      <TabsContent value="eth">
                        <h3 className="font-bold text-lg mb-2">Pay with Ethereum (ETH)</h3>
                        <AddressDisplay network="Ethereum Network" address={addresses.eth} />
                      </TabsContent>
                      <TabsContent value="ltc">
                         <h3 className="font-bold text-lg mb-2">Pay with Litecoin (LTC)</h3>
                        <AddressDisplay network="Litecoin Network" address={addresses.ltc} />
                      </TabsContent>
                      <TabsContent value="xrp">
                         <h3 className="font-bold text-lg mb-2">Pay with Ripple (XRP)</h3>
                        <AddressDisplay network="XRP Network" address={addresses.xrp} />
                      </TabsContent>
                    </Tabs>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-bold mb-2 text-primary">Important Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                        <li>Send the <span className="font-bold text-foreground">exact amount</span> to the correct address and network.</li>
                        <li>For XRP, a destination tag is not required.</li>
                        <li>After payment, send a screenshot of the transaction to our admin on Telegram.</li>
                        <li>Admin: <span className="font-bold text-foreground">@AF3092</span></li>
                        <li>Your plan will be activated once the transaction is confirmed.</li>
                      </ol>
                    </div>

                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 animate-press" asChild>
                      <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">Contact Admin on Telegram</a>
                    </Button>
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

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageComponent />
        </Suspense>
    )
}
