
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { TestimonialSection } from '@/components/sections/testimonial-section';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaSection } from '@/components/sections/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
