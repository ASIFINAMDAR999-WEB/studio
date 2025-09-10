
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/loader';

const FeaturesSection = dynamic(() => import('@/components/sections/features-section').then(mod => mod.FeaturesSection), {
  loading: () => <Loader />,
});
const PricingSection = dynamic(() => import('@/components/sections/pricing-section').then(mod => mod.PricingSection), {
  loading: () => <Loader />,
});
const TestimonialSection = dynamic(() => import('@/components/sections/testimonial-section').then(mod => mod.TestimonialSection), {
  loading: () => <Loader />,
});
const FaqSection = dynamic(() => import('@/components/sections/faq-section').then(mod => mod.FaqSection), {
  loading: () => <Loader />,
});
const CtaSection = dynamic(() => import('@/components/sections/cta-section').then(mod => mod.CtaSection), {
  loading: () => <Loader />,
});


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
