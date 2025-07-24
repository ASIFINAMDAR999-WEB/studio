
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const connectionPoints = [
  { top: '25%', left: '15%' }, // North America
  { top: '45%', left: '22%' }, // North America
  { top: '50%', left: '80%' }, // East Asia
  { top: '75%', left: '75%' }, // Australia
  { top: '30%', left: '50%' }, // Europe
  { top: '60%', left: '30%' }, // South America
  { top: '55%', left: '52%' }, // Africa
  { top: '40%', left: '65%' }, // Central Asia
];

export function WorldMapSection() {
  return (
    <section id="world-map" className="py-20 md:py-28 bg-card/50">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold"
          >
            Connecting The World
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-muted-foreground"
          >
            Our infrastructure spans the globe, ensuring reliable and high-quality connections no matter where you are.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative aspect-[1.8] w-full animate-glow-pulse">
            <Image
              src="https://i.ibb.co/PggT5Tj/world-map-dark-blue.png"
              alt="World map with connection points"
              layout="fill"
              objectFit="contain"
              className="z-0"
              unoptimized
            />
          </div>
          {connectionPoints.map((point, index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 rounded-full bg-primary z-10"
              style={{
                top: point.top,
                left: point.left,
                boxShadow: '0 0 12px 3px hsl(var(--primary))',
              }}
              animate={{
                scale: [1, 1.2, 1, 1.3, 1],
                opacity: [0.7, 1, 0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: index * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
