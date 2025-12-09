
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Video, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function CtaSection() {
  const ctaButtons = [
    {
      href: "/bots",
      label: "View Our Bots",
      icon: <Bot className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />,
      ariaLabel: "View our bots"
    },
    {
      href: "https://t.me/+Eg-SFpyzbpM0YzM1",
      label: "Watch Demos",
      icon: <Video className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />,
      ariaLabel: "Watch demos on Telegram",
      isExternal: true
    },
    {
      href: "https://t.me/CSG555",
      label: "Contact Admin",
      icon: <User className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
      ariaLabel: "Contact admin on Telegram",
      isExternal: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  return (
    <section id="cta" className="py-20 md:py-28" aria-labelledby="cta-heading">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <Card className="text-primary-foreground shadow-xl overflow-hidden relative group/card bg-gradient-to-br from-primary via-accent to-purple-400 animated-gradient transform-gpu">
            <div 
              className="absolute inset-0 bg-grid-pattern-small opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"
            />
            <CardContent className="p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative z-10">
              <div className="flex-1">
                <motion.h2 id="cta-heading" className="text-3xl font-bold" variants={itemVariants}>
                  Ready to Get Started?
                </motion.h2>
                <motion.p className="text-primary-foreground/80 mt-2 max-w-xl mx-auto lg:mx-0" variants={itemVariants}>
                  Explore our bots, watch demos, or contact support directly.
                </motion.p>
              </div>
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-end gap-4 flex-shrink-0"
                variants={containerVariants}
              >
                {ctaButtons.map((buttonInfo, index) => (
                  <motion.div key={index} variants={itemVariants} whileHover={buttonHover}>
                    <Button 
                      asChild 
                      size="lg" 
                      className="text-lg py-7 px-8 group transition-all duration-300 transform-gpu shadow-lg hover:shadow-2xl" 
                      variant="secondary"
                    >
                      {buttonInfo.isExternal ? (
                        <a href={buttonInfo.href} target="_blank" rel="noopener noreferrer" aria-label={buttonInfo.ariaLabel}>
                          {buttonInfo.label}
                          {buttonInfo.icon}
                        </a>
                      ) : (
                        <Link href={buttonInfo.href} aria-label={buttonInfo.ariaLabel}>
                          {buttonInfo.label}
                          {buttonInfo.icon}
                        </Link>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
