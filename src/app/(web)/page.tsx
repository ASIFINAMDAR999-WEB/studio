
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { FaqSection } from '@/components/sections/faq-section';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const TestimonialSection = dynamic(() => import('@/components/sections/testimonial-section').then(mod => mod.TestimonialSection));
const CtaSection = dynamic(() => import('@/components/sections/cta-section').then(mod => mod.CtaSection));


export default function Home() {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="/#"]');

      if (anchor) {
        event.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
            const elementId = href.substring(2);
            const element = document.getElementById(elementId);
            if (element) {
              window.scrollTo({
                top: element.offsetTop - 80, // Adjust for header height
                behavior: 'smooth',
              });
            }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

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
