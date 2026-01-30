
'use client';

import { AnimatePresence } from 'framer-motion';
import { CustomPlanScreen } from '@/components/custom-plan/custom-plan-screen';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function CustomPlanPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <CustomPlanScreen key="custom-plan-screen" />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
