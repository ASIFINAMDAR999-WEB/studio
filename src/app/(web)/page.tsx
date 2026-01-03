
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { FaqSection } from '@/components/sections/faq-section';
import dynamic from 'next/dynamic';
import { CryptoCarouselSection } from '@/components/sections/crypto-carousel-section';

const TestimonialSection = dynamic(() => import('@/components/sections/testimonial-section').then(mod => mod.TestimonialSection));
const CtaSection = dynamic(() => import('@/components/sections/cta-section').then(mod => mod.CtaSection));

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CryptoCarouselSection />
        <FaqSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
