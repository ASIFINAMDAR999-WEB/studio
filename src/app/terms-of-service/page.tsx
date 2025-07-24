
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
                By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. We may modify the terms at any time, and such modifications will be effective immediately upon posting.
              </p>

              <h2 className="text-xl font-semibold text-foreground">2. Use of Services</h2>
              <p>
                You agree to use our services only for lawful purposes. You are responsible for all of your activity in connection with the services. You shall not (and shall not permit any third party to) either (a) take any action or (b) upload, download, post, submit or otherwise distribute or facilitate distribution of any content on or through the service that is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive of another's privacy, or is otherwise inappropriate as determined by us in our sole discretion.
              </p>

              <h2 className="text-xl font-semibold text-foreground">3. Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are and will remain the exclusive property of REDArmor v0.2 and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>

              <h2 className="text-xl font-semibold text-foreground">4. Termination</h2>
              <p>
                We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>

              <h2 className="text-xl font-semibold text-foreground">5. Limitation of Liability</h2>
              <p>
                In no event shall REDArmor v0.2, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
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
