
import { GlobeAnimation } from '@/components/globe-animation';

export function HeroSection() {
  return (
    <section id="hero" className="relative text-center py-20 md:py-32 overflow-hidden h-[600px] md:h-[800px] flex items-center justify-center">
       <div id="globe-container" className="absolute top-0 left-0 w-full h-full">
          <GlobeAnimation />
       </div>
       <div className="container px-4 sm:px-6 animate-fade-in-up relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl">
          Global Reach, Local Presence
        </h1>
        <p className="max-w-xl mx-auto mt-4 text-lg text-white/80 drop-shadow-lg">
          Unlock top-tier features with our world-class plans. Secure and private communication, anywhere on Earth.
        </p>
      </div>
    </section>
  );
}
