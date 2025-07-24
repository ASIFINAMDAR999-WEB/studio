
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
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
              <CardTitle className="text-3xl md:text-4xl font-bold">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground space-y-6 px-6 md:px-8 pb-8">
              <p className="text-center text-sm">
                <strong>Last Updated: {lastUpdated}</strong>
              </p>
              
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                Welcome to REDArmor v0.2. We are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our call spoofing, voice changing, and other related services ("Services"). Please read this policy carefully.
              </p>

              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <p>
                We prioritize your privacy and aim to collect as little information as possible. We may collect information necessary to provide the Services, such as account registration details and payment transaction data for cryptocurrency payments. We do not monitor or record the content of your calls.
              </p>

              <h2 className="text-xl font-semibold text-foreground">3. Use of Your Information</h2>
              <p>
                Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to create and manage your account, process your transactions, and deliver the Services you have requested.
              </p>

              <h2 className="text-xl font-semibold text-foreground">4. Disclosure of Your Information</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may disclose information if we believe the release is necessary to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
              </p>

              <h2 className="text-xl font-semibold text-foreground">5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your information. While we have taken reasonable steps to secure the information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
              
              <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us through our official Telegram channel or by contacting our admin.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
