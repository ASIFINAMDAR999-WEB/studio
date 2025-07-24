
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CallCraft',
  description: 'Learn about our commitment to your privacy and anonymity. We do not collect or store any personally identifiable information.',
};

export default function PrivacyPolicyPage() {
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
                <strong>Last Updated: October 26, 2023</strong>
              </p>
              
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                Welcome to CallCraft. We are committed to protecting your privacy and ensuring your anonymity. This Privacy Policy explains our stance on data. By using our call spoofing, voice changing, and other related services ("Services"), you agree to this policy.
              </p>

              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <p>
                We do not collect any personally identifiable information. Our service is designed from the ground up to ensure client anonymity. We do not require registration, and we do not store any user data, IP addresses, or call logs. We do not monitor or record the content of your calls.
              </p>

              <h2 className="text-xl font-semibold text-foreground">3. Use of Your Information</h2>
              <p>
                Since we do not collect any personal information, there is no information to use. Your activities are your own. The only data we interact with are anonymous cryptocurrency transaction hashes for payment verification, which are not linked to any personal identity.
              </p>

              <h2 className="text-xl font-semibold text-foreground">4. Disclosure of Your Information</h2>
              <p>
                We hold no user information, so there is nothing to disclose. We cannot sell, trade, or otherwise transfer information that we do not have. We may only cooperate with law enforcement if legally compelled and if there is any data to provide, which is generally limited to transaction data on the public blockchain.
              </p>

              <h2 className="text-xl font-semibold text-foreground">5. Security of Your Information</h2>
              <p>
                Our security model is based on not collecting your information in the first place. Your anonymity is your best security. While we secure our systems, we remind you that the most effective security measure is our commitment to not storing any of your personal data.
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
