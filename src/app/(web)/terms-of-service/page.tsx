
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service for Callspoofing | REDArmor 2.0',
  description: 'Read the Terms of Service for REDArmor 2.0. Understand your responsibilities when using our professional callspoofing and global VoIP services.',
  alternates: {
    canonical: 'https://www.callspoofing.shop/terms-of-service',
  },
};

export default function TermsOfServicePage() {
    const content = [
    { title: "1. Agreement to Terms", text: "By using our services (\"Services\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our Services. We may modify the terms at any time." },
    { title: "2. Use of Services", text: "You agree to use our Services, including call spoofing and voice changing, only for lawful purposes. The legality of call spoofing varies significantly by jurisdiction. It is your sole responsibility to ensure that your use of our Services complies with all applicable local, state, national, and international laws, including but not limited to those in the United States, United Kingdom, and all European countries. You shall not use the Service for any fraudulent, harassing, or illegal activity." },
    { title: "3. Intellectual Property", text: "The Service and its original content, features, and functionality are and will remain the exclusive property of REDArmor 2.0 and its licensors." },
    { title: "4. Termination", text: "We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms by engaging in illegal activities." },
    { title: "5. Limitation of Liability", text: "In no event shall REDArmor 2.0, nor its directors or employees, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service, particularly any use that violates applicable laws. You agree to indemnify and hold harmless REDArmor 2.0 from any claims arising out of your unlawful use of the Services." },
    { title: "6. Governing Law", text: "These Terms shall be governed and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions." }
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
          <div className="max-w-4xl mx-auto animate-in fade-in-up">
            <Card className="shadow-2xl bg-card/80 backdrop-blur-sm border-primary/20">
               <CardHeader className="text-center pb-4 border-b">
                <CardTitle className="text-3xl md:text-4xl font-bold">Terms of Service</CardTitle>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
