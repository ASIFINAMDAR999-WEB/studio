
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AnimatePresence } from 'framer-motion';
import { AccessScreen } from '@/components/access/access-screen';
import { DialerScreen } from '@/components/access/dialer-screen';
import { Header } from '@/components/layout/header';

const PLAN_NAME = 'Platinum 1-Month';

/**
 * AccessPage component
 * This is the main component for the /access route.
 * It manages the state between the access code screen and the dialer screen.
 */
export default function AccessPage() {
  // State to track if the user has been granted access.
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [planName, setPlanName] = useState('');

  // Check for access cookie on initial render
  useEffect(() => {
    const accessCookie = Cookies.get('accessGranted');
    if (accessCookie === 'true') {
      setIsAccessGranted(true);
      setPlanName(PLAN_NAME); // Set plan name if already logged in
    }
  }, []);

  // Callback function passed to AccessScreen to update the state upon successful login.
  const handleSuccess = () => {
    // Set a cookie that expires in 1 day
    Cookies.set('accessGranted', 'true', { expires: 1 });
    setIsAccessGranted(true);
    setPlanName(PLAN_NAME); // Set plan name on successful login
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {/* AnimatePresence handles the transition between the two screens. */}
        <AnimatePresence mode="wait">
          {!isAccessGranted ? (
            // Show the access code screen if access is not granted.
            <AccessScreen key="access-screen" onSuccess={handleSuccess} />
          ) : (
            // Show the dialer screen once access is granted.
            <DialerScreen key="dialer-screen" planName={planName} />
          )}
        </AnimatePresence>
      </main>
      {/* Footer is removed for a cleaner dialer view */}
    </div>
  );
}
