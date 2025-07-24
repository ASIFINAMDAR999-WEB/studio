
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in-up">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl font-bold">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground space-y-6 px-6 md:px-8 pb-8">
              <p className="text-center text-sm">
                <strong>Last Updated: {lastUpdated}</strong>
              </p>

              <h2 className="text-xl font-semibold text-foreground">1. Agreement to Terms</h2>
              <p>
                By using our services ("Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our Services. We may modify the terms at any time.
              </p>

              <h2 className="text-xl font-semibold text-foreground">2. Use of Services</h2>
              <p>
                You agree to use our Services, including call spoofing and voice changing, only for lawful purposes. The legality of call spoofing varies by jurisdiction. It is your sole responsibility to ensure that your use of our Services complies with all applicable local, state, national, and international laws. You shall not use the Service for any fraudulent, harassing, or illegal activity.
              </p>

              <h2 className="text-xl font-semibold text-foreground">3. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of REDArmor v0.2 and its licensors.
              </p>

              <h2 className="text-xl font-semibold text-foreground">4. Termination</h2>
              <p>
                We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms by engaging in illegal activities.
              </p>

              <h2 className="text-xl font-semibold text-foreground">5. Limitation of Liability</h2>
              <p>
                In no event shall REDArmor v0.2, nor its directors or employees, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service, particularly any use that violates applicable laws. You agree to indemnify and hold harmless REDArmor v0.2 from any claims arising out of your unlawful use of the Services.
              </p>

              <h2 className="text-xl font-semibold text-foreground">6. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
