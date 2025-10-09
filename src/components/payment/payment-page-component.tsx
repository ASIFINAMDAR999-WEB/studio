
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Clipboard, Wallet, AlertTriangle, Send, ShieldCheck, ArrowLeft, PenSquare, Gift } from 'lucide-react';
import { plans } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import Image from 'next/image';

const addresses: Record<string, { network: string; address: string }> = {
  usdt_trc20: { network: 'USDT TRC-20 (Tron Network)', address: 'TYdBx5944hZZUnfoMCNEDy4pKZ17oC4N3a' },
  usdt_erc20: { network: 'USDT ERC-20 (Ethereum Network)', address: '0xd30CD71Fb569D14c67f4cB9c03aA0fF1ad02f3d8' },
  usdt_bep20: { network: 'USDT BEP-20 (Binance Smart Chain)', address: '0xd30CD71Fb569D14c67f4cB9c03aA0fF1ad02f3d8' },
  btc: { network: 'Bitcoin (BTC) Network', address: 'bc1qrl0c5tyr7hcpa7na8025sgt85aefazun5d4rmy' },
  eth: { network: 'Ethereum (ETH) Network', address: '0x1b8Cb4565Db3d2c7ebF02839aDd1741031bC1709' },
  ltc: { network: 'Litecoin (LTC) Network', address: 'ltc1q0vnwl9guz7pd3dgjl5swl8gl4733mgch0mslqd' },
  xrp: { network: 'Ripple (XRP) Network', address: 'rBs9Hq2srqPu8KA7gheBE257GRJg3Xa8jS' },
  sol: { network: 'Solana (SOL) Network', address: 'BS2PW1znWhf1ypSYSuWvmLXzX1BYU6n9P7DB34VNDk6E' },
  trx: { network: 'Tron (TRX) TRC-20 Network', address: 'TYdBx5944hZZUnfoMCNEDy4pKZ17oC4N3a' },
  ton: { network: 'TON', address: 'UQCTDuH5udkgZDqvhmhmOHhG7NazA7g85-PUqj63jutnGXBI' },
};

const cryptoOptions: Record<string, { name: string; networks: string[] }> = {
    usdt_trc20: { name: 'USDT (Tether)', networks: ['usdt_trc20']},
    usdt_erc20: { name: 'USDT (Tether)', networks: ['usdt_erc20']},
    usdt_bep20: { name: 'USDT (Tether)', networks: ['usdt_bep20']},
    btc: { name: 'Bitcoin (BTC)', networks: ['btc']},
    eth: { name: 'Ethereum (ETH)', networks: ['eth']},
    ltc: { name: 'Litecoin (LTC)', networks: ['ltc']},
    xrp: { name: 'Ripple (XRP)', networks: ['xrp']},
    sol: { name: 'Solana (SOL)', networks: ['sol']},
    trx: { name: 'Tron (TRX)', networks: ['trx']},
    ton: { name: 'TON', networks: ['ton']},
}

const qrCodes: Record<string, string> = {
  btc: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-09-12_08-27-20-430.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA5LTEyXzA4LTI3LTIwLTQzMC5wbmciLCJpYXQiOjE3NTc2NDY2NTksImV4cCI6MjA3MzAwNjY1OX0._0MZqMTJArQqibbrTsuf_JN373_MK8SwN-OjnMpiogo',
  trx: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-10-09_15-26-46-955.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTEwLTA5XzE1LTI2LTQ2LTk1NS5wbmciLCJpYXQiOjE3NjAwMDQyODAsImV4cCI6MjA3NTM2NDI4MH0.fGKobL3rORKiSuE88c8RtV3Y1zPkksSZlgSpa9RxEiY',
  eth: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-09-12_09-36-24-890.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA5LTEyXzA5LTM2LTI0LTg5MC5wbmciLCJpYXQiOjE3NTc2NTAwNDQsImV4cCI6MjA3MzAxMDA0NH0.KHWhq8PMM2q5qb_ICnMMHb4vHTH6ECgWPHS1dCcW0aY',
  ltc: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-09-12_09-40-17-854.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA5LTEyXzA5LTQwLTE3LTg1NC5wbmciLCJpYXQiOjE3NTc2NTAzNTMsImV4cCI6MjA3MzAxMDM1M30.Z4_FQ_h49OLTmzLi85K95_IJoX2BlFmDSdHlW76houo',
  xrp: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-09-12_09-46-25-627.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA5LTEyXzA5LTQ2LTI1LTYyNy5wbmciLCJpYXQiOjE3NTc2NTA2NTYsImV4cCI6MjA3MzAxMDY1Nn0.ecMfSJfbEr64WHr9F_57m3hq7RLX3xnQD8WRMNDZj_0',
  sol: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-09-12_09-54-02-688.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA5LTEyXzA5LTU0LTAyLTY4OC5wbmciLCJpYXQiOjE3NTc2NTExOTcsImV4cCI6MjA3MzAxMTE5N30.lMmjFzzz3BbYA2XjczRGpW5KeDMN7PgLPwKLaW97bi4',
  ton: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-09-12_10-08-56-974.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA5LTEyXzEwLTA4LTU2LTk3NC5wbmciLCJpYXQiOjE3NTc2NTE5OTIsImV4cCI6MjA3MzAxMTk5Mn0.rmVIGvGJQk1Xo9ArWfpgadJNbItpvzR5mp3rUY7DR3A',
  usdt_trc20: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-10-09_15-24-10-048.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTEwLTA5XzE1LTI0LTEwLTA0OC5wbmciLCJpYXQiOjE3NjAwMDQxMjIsImV4cCI6MjA3NTM2NDEyMn0.nkpkF0gK90TXUc1x5ByIP9a4QxleZX2eDIgedtPuAIM',
  usdt_bep20: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-10-09_15-41-49-574.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTEwLTA5XzE1LTQxLTQ5LTU3NC5wbmciLCJpYXQiOjE3NjAwMDQ5NTgsImV4cCI6MjA3NTM2NDk1OH0.TBi2LGIaDVHIDZJfoJOWOgMbjELkYMwkgyhtpjpiO2U',
  usdt_erc20: 'https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-10-09_15-43-48-752.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTEwLTA5XzE1LTQzLTQ4LTc1Mi5wbmciLCJpYXQiOjE3NjAwMDUwMzYsImV4cCI6MjA3NTM2NTAzNn0.LqEN0Ay0v_iubWAaWaz4rREH0xZtBFnFGriYUUIuM3s',
};

export function PaymentPageComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum 1-Month';
  const cryptoKey = searchParams.get('crypto');
  
  useEffect(() => {
    document.title = `Payment for ${planName} | REDArmor 2.0`;
  }, [planName]);

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
  
  const selectedCrypto = cryptoKey ? cryptoOptions[cryptoKey] : null;
  const qrCodeUrl = cryptoKey ? qrCodes[cryptoKey] : null;

  const instructions = [
    { icon: <AlertTriangle className="h-5 w-5 text-primary" />, text: <>Send the <span className="font-bold text-foreground">exact amount.</span> Double-check the address and network before sending.</> },
    { icon: <PenSquare className="h-5 w-5 text-primary" />, text: "After payment, send a screenshot of the transaction to our admin on Telegram." },
    { icon: <Send className="h-5 w-5 text-primary" />, text: <>Admin Telegram: <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:underline">@AF3092</a></> },
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, text: "Your plan will be activated once the transaction is confirmed by our team." },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Complete Your Purchase
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              You're almost there! Follow the steps below to securely complete your payment.
            </p>
          </div>
          
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Card className="shadow-lg border-l-4 border-primary">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                    <p className="text-lg font-semibold">{planName}</p>
                    <div className="text-right">
                        <p className="text-2xl font-bold">{isTopUp ? topUpAmount : plan.priceString}</p>
                        {!isTopUp && <p className="text-sm text-muted-foreground">{plan.duration}</p>}
                    </div>
                </div>
                <div className="text-sm text-muted-foreground pt-2 border-t">
                    <div className="font-semibold mb-2 text-foreground">Features Included:</div>
                    <ul className="space-y-1">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 3 && (
                        <li className='text-xs'>+ {plan.features.length - 3} more features</li>
                      )}
                    </ul>
                </div>
                {plan.bonus && (
                  <div className="pt-4 border-t">
                    <div className="p-3 bg-primary/5 border-l-4 border-primary/50 rounded-r-md flex items-start gap-3">
                        <Gift className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <span className="font-bold text-primary">{plan.bonus.split(':')[0]}:</span>
                          <span className="text-muted-foreground">
                            {plan.bonus.split(':')[1]}
                          </span>
                        </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <div className='flex justify-between items-center flex-wrap gap-2'>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Wallet className="h-6 w-6 text-primary"/>
                            <span>Payment Instructions</span>
                        </CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/payment/select?plan=${encodeURIComponent(planName)}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Change Crypto
                            </Link>
                        </Button>
                    </div>
                    {selectedCrypto && <CardDescription>Pay with {selectedCrypto.name}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-6">
                    {selectedCrypto ? (
                        <div className='space-y-4'>
                            {selectedCrypto.networks.map(networkKey => {
                                const { network, address } = addresses[networkKey] || {};
                                return (
                                    <div key={networkKey} className="bg-muted/50 rounded-lg p-4 transition-all duration-300 hover:bg-muted/80">
                                        <p className="text-sm text-muted-foreground mb-1">{network}</p>
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
                                            <p className="font-mono text-sm sm:text-base break-all">{address || 'Address not available'}</p>
                                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(address)} disabled={!address || address === 'Address not available'} className="self-end sm:self-center flex-shrink-0">
                                                <Clipboard className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                             {qrCodeUrl && (
                                <div className="mt-4 flex flex-col items-center">
                                  <div className="p-4 bg-muted/30 rounded-lg border shadow-inner">
                                    <Image
                                        src={qrCodeUrl}
                                        alt={`${selectedCrypto.name} QR Code`}
                                        width={200}
                                        height={200}
                                        className="rounded-lg"
                                        data-ai-hint="qr code"
                                    />
                                  </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">No cryptocurrency selected.</p>
                            <Button asChild>
                                 <Link href={`/payment/select?plan=${encodeURIComponent(planName)}`}>
                                    Choose Payment Method
                                 </Link>
                            </Button>
                        </div>
                    )}

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-4 mt-4">
                      <h4 className="font-bold text-primary">Important Instructions:</h4>
                      <ul className="space-y-3">
                        {instructions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                            <span className="text-sm text-muted-foreground">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                       {cryptoKey === 'xrp' && (
                        <p className="text-sm text-muted-foreground pl-8 pt-2 border-t border-primary/10">Note: For XRP, a destination tag is not required.</p>
                      )}
                      {cryptoKey === 'ton' && (
                        <p className="text-sm text-muted-foreground pl-8 pt-2 border-t border-primary/10">Note: For TON, a memo/comment is not required if sending from a private wallet. If sending from an exchange, a memo may be required.</p>
                      )}
                    </div>

                    <Button size="lg" className="w-full text-lg py-6" asChild>
                      <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer" aria-label="Contact admin on Telegram to confirm payment">Contact Admin on Telegram</a>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
