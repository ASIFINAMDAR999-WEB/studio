
'use client'

import GlobeAnimation from "@/components/globe-animation";

export function GlobeSection() {
  return (
    <section id="globe" className="py-20 md:py-28 bg-card">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold">Our Global Network</h2>
          <p className="mt-4 text-muted-foreground">
            Connecting calls across the world with secure, high-speed routing.
          </p>
        </div>
        <div className="relative h-[500px] animate-fade-in-up [animation-delay:200ms] rounded-xl overflow-hidden border shadow-lg">
          <GlobeAnimation />
        </div>
      </div>
    </section>
  );
}
