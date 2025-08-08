
'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AccessScreen } from '@/components/access/access-screen';
import { DialerScreen } from '@/components/access/dialer-screen';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

/**
 * AccessPage component
 * This is the main component for the /access route.
 * It manages the state between the access code screen and the dialer screen.
 */
export default function AccessPage() {
  // State to track if the user has been granted access.
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  // Callback function passed to AccessScreen to update the state upon successful login.
  const handleSuccess = () => {
    setIsAccessGranted(true);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        {/* AnimatePresence handles the transition between the two screens. */}
        <AnimatePresence mode="wait">
          {!isAccessGranted ? (
            // Show the access code screen if access is not granted.
            <AccessScreen key="access-screen" onSuccess={handleSuccess} />
          ) : (
            // Show the dialer screen once access is granted.
            <DialerScreen key="dialer-screen" />
          )}
        </AnimatePresence>
      </main>
      {/* Footer is removed for a cleaner dialer view */}
    </div>
  );
}
