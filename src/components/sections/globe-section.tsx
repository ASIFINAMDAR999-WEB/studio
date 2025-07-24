
'use client'

import { GlobeAnimation } from '@/components/globe-animation';

export function GlobeSection() {
  return (
    <section id="globe" className="relative text-center overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[80vh] w-full">
       <GlobeAnimation />
    </section>
  );
}
