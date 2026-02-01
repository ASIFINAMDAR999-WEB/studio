'use client';

import { AnimatePresence } from 'framer-motion';
import { CustomPlanScreen } from '@/components/custom-plan/custom-plan-screen';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';

export default function CustomPlanPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <motion.div 
            className="relative container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100dvh-150px)] py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
             <div 
                className="absolute inset-0 z-0 opacity-50 dark:opacity-60"
                style={{
                background: `radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`,
                }}
            />
            <div className="absolute inset-0 bg-grid-pattern-small opacity-20 dark:opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_80%)] -z-10"></div>
            
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <CustomPlanScreen key="custom-plan-screen" />
                </AnimatePresence>
                <p className="text-muted-foreground text-center mt-8 max-w-sm mx-auto">
                    Have a special code from our team? Enter it here to reveal exclusive plans and offers.
                </p>
            </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
