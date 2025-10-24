
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const content = [
    { title: "1. Introduction", text: "Welcome to REDArmor 2.0. We are committed to protecting your privacy and ensuring your anonymity. This Privacy Policy explains our stance on data. By using our call spoofing, voice changing, and other related services (\"Services\"), you agree to this policy." },
    { title: "2. Information We Collect", text: "We do not collect any personally identifiable information. Our service is designed from the ground up to ensure client anonymity. We do not require registration, and we do not store any user data, IP addresses, or call logs. We do not monitor or record the content of your calls." },
    { title: "3. Use of Your Information", text: "Since we do not collect any personal information, there is no information to use. Your activities are your own. The only data we interact with are anonymous cryptocurrency transaction hashes for payment verification, which are not linked to any personal identity." },
    { title: "4. GDPR and UK Data Protection", text: "For users in the European Economic Area (EEA) and the United Kingdom, we are compliant with the General Data Protection Regulation (GDPR) and relevant UK data protection laws. As our service is built on the principle of not collecting personal data, we inherently meet the highest standards of data minimization. You retain all your rights under these regulations, though no personal data is held by us that would necessitate data access, rectification, or erasure requests." },
    { title: "5. Disclosure of Your Information", text: "We hold no user information, so there is nothing to disclose. We cannot sell, trade, or otherwise transfer information that we do not have. We may only cooperate with law enforcement if legally compelled and if there is any data to provide, which is generally limited to transaction data on the public blockchain." },
    { title: "6. Security of Your Information", text: "Our security model is based on not collecting your information in the first place. Your anonymity is your best security. While we secure our systems, we remind you that the most effective security measure is our commitment to not storing any of your personal data." },
    { title: "7. Contact Us", text: "If you have questions or comments about this Privacy Policy, please contact us through our official Telegram channel or by contacting our admin." },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-20 md:py-28 relative">
        <div 
          className="absolute inset-0 z-0 opacity-50 dark:opacity-60"
          style={{
            background: `radial-gradient(circle at 50% 20%, hsl(var(--primary) / 0.1), transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern-small opacity-20 dark:opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_80%)] -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Card className="shadow-2xl bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader className="text-center pb-4 border-b">
                <CardTitle className="text-3xl md:text-4xl font-bold">Privacy Policy</CardTitle>
                 <p className="text-sm text-muted-foreground pt-2">
                  <strong>Last Updated: October 26, 2023</strong>
                </p>
              </CardHeader>
              <CardContent className="prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground space-y-8 px-6 md:px-8 py-8">
                {content.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-xl font-semibold text-foreground !mb-3">{section.title}</h2>
                    <p className="!mt-0">{section.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
