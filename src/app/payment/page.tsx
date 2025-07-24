
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clipboard, Terminal, Wallet } from 'lucide-react';
import { plans } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

const addresses: Record<string, { network: string; address: string }> = {
  usdt_trc20: { network: 'USDT TRC-20 (Tron Network)', address: 'THcpxC6Tzye4vaYxLcP2ufkbhy7XMCVdRc' },
  usdt_erc20: { network: 'USDT ERC-20 (Ethereum Network)', address: '0x36da8622EBdD7BF9AA6668fb68Ec18870CCCDAAC' },
  usdt_bep20: { network: 'USDT BEP-20 (Binance Smart Chain)', address: '0x36da8622EBdD7BF9AA6668fb68Ec18870CCCDAAC' },
  btc: { network: 'Bitcoin (BTC) Network', address: 'bc1q5clkxvk8u9lgfdkq2njutcd0pmxpe08um4mdyw' },
  eth: { network: 'Ethereum (ETH) Network', address: '0x36da8622EBdD7BF9AA6668fb68Ec18870CCCDAAC' },
  ltc: { network: 'Litecoin (LTC) Network', address: 'ltc1qwumrvhys9nmp7my4pjnzdcepx9zwcwnhnuwxxs' },
  xrp: { network: 'Ripple (XRP) Network', address: 'rf8nfQ2AZhHiJKkQTeaVqtX3NzckCSbSqV' },
};

const cryptoOptions: Record<string, { name: string; networks: string[] }> = {
    usdt: { name: 'USDT (Tether)', networks: ['usdt_trc20', 'usdt_erc20', 'usdt_bep20']},
    btc: { name: 'Bitcoin (BTC)', networks: ['btc']},
    eth: { name: 'Ethereum (ETH)', networks: ['eth']},
    ltc: { name: 'Litecoin (LTC)', networks: ['ltc']},
    xrp: { name: 'Ripple (XRP)', networks: ['xrp']},
}

function PaymentPageComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';
  const cryptoName = searchParams.get('crypto');
  
  const isTopUp = planName.includes('Silver Plan');
  const topUpAmount = isTopUp ? planName.split(' - ')[1] : null;

  const basePlanName = isTopUp ? planName.split(' - ')[0] : planName;
  const plan = plans.find((p) => p.name === basePlanName) || plans[0];
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    if (text && text !== 'Address not available') {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Address has been copied to your clipboard.",
      });
    } else {
      toast({
        title: "Error",
        description: "Address is not available to copy.",
        variant: "destructive",
      });
    }
  };

  const AddressDisplay = ({ network, address }: { network: string, address: string }) => (
    <div className="bg-muted/50 rounded-lg p-4 transition-all duration-300 hover:bg-muted/80">
      <p className="text-sm text-muted-foreground mb-1">{network}</p>
      <div className="flex justify-between items-center gap-4">
        <p className="font-mono text-sm sm:text-base break-all">{address}</p>
        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(address)} disabled={!address || address === 'Address not available'}>
          <Clipboard className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
  
  const selectedCrypto = cryptoName ? cryptoOptions[cryptoName] : null;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground animate-fade-in-up">
              Complete Your Purchase
            </h1>
            <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
              You're almost there! Follow the steps below to securely complete your payment.
            </p>
          </div>

          <Card className="bg-muted/30 border-l-4 border-primary mb-8 animate-fade-in-up [animation-delay:400ms]">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <Terminal className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">You are purchasing: {planName}</p>
                  <p className="text-sm text-muted-foreground">Please double-check all details before sending your payment.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 md:gap-12 space-y-8 md:space-y-0 animate-fade-in-up [animation-delay:600ms]">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Order Summary</h2>
                <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-bold">{isTopUp ? topUpAmount : plan.priceString}</span>
                      {!isTopUp && <span className="text-xl text-muted-foreground">{plan.duration}</span>}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Wallet className="h-6 w-6"/>
                    <span>2. Payment Instructions</span>
                </h2>
                <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
                  <CardContent className="pt-6 space-y-6">
                    {selectedCrypto ? (
                        <>
                            <div className='flex justify-between items-center'>
                                <h3 className="font-bold text-lg">Pay with {selectedCrypto.name}</h3>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/payment/select?plan=${encodeURIComponent(planName)}`}>
                                        Change Crypto
                                    </Link>
                                </Button>
                            </div>

                            <div className='space-y-4'>
                                {selectedCrypto.networks.map(networkKey => (
                                    <AddressDisplay
                                        key={networkKey}
                                        network={addresses[networkKey].network}
                                        address={addresses[networkKey].address}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No cryptocurrency selected. Please go back and choose a payment method.</p>
                    )}

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
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <PaymentPageComponent />
    </Suspense>
  );
}
