
'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, Loader2, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { plans } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface OxaPayInvoice {
    payLink: string;
    trackId: string;
    orderId: string;
}

function OxaPayPageComponent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Platinum Plan';
  const { toast } = useToast();

  const [invoice, setInvoice] = useState<OxaPayInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const isTopUp = planName.includes('Silver Plan');
  const topUpAmount = isTopUp ? planName.split(' - ')[1] : null;
  const basePlanName = isTopUp ? planName.split(' - ')[0] : planName;
  const plan = plans.find((p) => p.name === basePlanName) || plans[0];
  const amount = parseFloat((topUpAmount || plan.priceString).replace('$', ''));

  const createInvoice = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setInvoice(null);
    try {
      const response = await fetch('/api/oxapay/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          planName: planName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create invoice.');
      }

      setInvoice(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      toast({
        title: 'Error',
        description: err.message || 'Could not create OxaPay invoice.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [amount, planName, toast]);

  useEffect(() => {
    document.title = `Pay with OxaPay | ${planName} | REDArmor 2.0`;
    createInvoice();
  }, [planName, createInvoice]);

  const handleCheckStatus = async () => {
    if (!invoice) return;
    setIsCheckingStatus(true);
    try {
      const res = await fetch('/api/oxapay/check-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId: invoice.trackId, orderId: invoice.orderId }),
      });
      const data = await res.json();
      if (res.ok && data.status === 'PAID') {
        toast({
          title: 'Payment Confirmed!',
          description: 'Your payment has been confirmed successfully.',
          variant: 'default',
        });
        // Here you would redirect to a success page or update the UI
        // For now, we'll just show a success message.
        // router.push(`/payment/success?orderId=${invoice.orderId}`);
      } else {
        toast({
          title: 'Payment Status',
          description: data.message || `Status: ${data.status}`,
          variant: 'default',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to check payment status.',
        variant: 'destructive',
      });
    } finally {
      setIsCheckingStatus(false);
    }
  };


  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 md:py-20 flex items-center justify-center">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-glow border-primary/30 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Image src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/IMG_0787.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9JTUdfMDc4Ny5wbmciLCJpYXQiOjE3NjczNjU2NDMsImV4cCI6MjA4MjcyNTY0M30.C36DXPHx9jIHSLWUjqGpM3TXMoUIzkMr69DO2DXoRg4" alt="OxaPay" width={120} height={40} />
                </div>
                <CardTitle className="text-2xl font-bold">OxaPay Checkout</CardTitle>
                <CardDescription>
                  You are purchasing the <span className="font-semibold text-primary">{planName}</span> plan for <span className="font-semibold text-primary">${amount.toFixed(2)}</span>.
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[250px] flex items-center justify-center">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-muted-foreground">Creating your secure invoice...</p>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                    <p className="font-semibold text-destructive">Failed to Create Invoice</p>
                    <p className="text-sm text-muted-foreground">{error}</p>
                    <Button onClick={createInvoice}>
                        Try Again
                    </Button>
                  </div>
                )}
                {invoice && (
                  <motion.div
                    className="text-center space-y-6 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-muted-foreground">Your secure OxaPay invoice has been created. Click the button below to proceed with your payment.</p>
                    <Button asChild size="lg" className="w-full text-lg py-7 group">
                      <a href={invoice.payLink} target="_blank" rel="noopener noreferrer">
                        Proceed to Payment
                        <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                     <div className="text-xs text-muted-foreground pt-4 border-t space-y-2">
                        <p>
                            Order ID: <code className="font-mono bg-muted p-1 rounded-sm">{invoice.orderId}</code>
                        </p>
                         <p>
                            Track ID: <code className="font-mono bg-muted p-1 rounded-sm">{invoice.trackId}</code>
                         </p>
                         <p className="pt-2">After paying, you can use the button below to verify your payment status.</p>
                     </div>
                     <Button variant="outline" onClick={handleCheckStatus} disabled={isCheckingStatus} className="w-full">
                        {isCheckingStatus ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <CheckCircle className="mr-2 h-4 w-4" />
                        )}
                        Check Payment Status
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function OxaPayComponent() {
    return (
        <Suspense>
            <OxaPayPageComponent />
        </Suspense>
    )
}
