
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { TestimonialSection } from '@/components/sections/testimonial-section';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaSection } from '@/components/sections/cta-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'REDArmor v0.2 | #1 Spoof Call Top-Up Plans | Buy Spoof Call Service USA/UK',
  description: 'Buy high-quality spoof call plans with fake caller ID. Trusted service for USA, UK & global clients. REDArmor v0.2 – #1 spoof call top-up store.',
};

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
