
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/loader';
import { useEffect } from 'react';

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
  useEffect(() => {
    const smoothScroll = (targetElement: Element, duration: number) => {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        window.scrollTo(0, ease(timeElapsed, startPosition, distance, duration));
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          event.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            smoothScroll(element, 800); // 800ms duration for a slower scroll
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
