
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ConnectionDot = ({ top, left, delay = 0 }: { top: string; left: string; delay?: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/80 shadow-[0_0_12px_3px_hsl(var(--primary))]"
    style={{ top, left }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1, 0.8, 1], opacity: 1 }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse',
      delay,
      ease: 'easeInOut',
    }}
  >
    <div className="relative w-2 h-2">
      <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
      <div className="relative bg-primary-foreground rounded-full w-2 h-2"></div>
    </div>
  </motion.div>
);

export function WorldMapSection() {
  const locations = [
    { top: '42%', left: '18%' }, // North America
    { top: '65%', left: '28%' }, // South America
    { top: '38%', left: '49%' }, // Europe
    { top: '55%', left: '55%' }, // Africa
    { top: '40%', left: '75%' }, // Asia
    { top: '80%', left: '80%' }, // Australia
    { top: '25%', left: '55%' }, // North Russia
    { top: '55%', left: '88%' }, // East Asia
  ];

  return (
    <section id="world-map" className="py-20 md:py-28 bg-card/50">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold">Connecting The World</h2>
          <p className="mt-4 text-muted-foreground">
            Our infrastructure spans the globe, ensuring reliable and high-quality connections no matter where you are.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto mt-16 aspect-[1.8] animate-fade-in-up [animation-delay:200ms]">
          <Image
            src="https://i.imgur.com/gsujHYV.png"
            alt="World Map"
            layout="fill"
            objectFit="contain"
            className="animate-glow-pulse opacity-80"
            data-ai-hint="world map"
          />
          <div className="absolute inset-0 w-full h-full">
            {locations.map((loc, i) => (
              <ConnectionDot key={i} top={loc.top} left={loc.left} delay={i * 0.2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Add framer-motion to package.json
