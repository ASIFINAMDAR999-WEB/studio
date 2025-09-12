
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AnimatePresence } from 'framer-motion';
import { AccessScreen } from '@/components/access/access-screen';
import { DialerScreen } from '@/components/access/dialer-screen';
import { Header } from '@/components/layout/header';


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
    // Set page title dynamically on client side
    document.title = 'Client Access | REDArmor 2.0';

    const accessCookie = Cookies.get('accessGranted');
    if (accessCookie === 'true') {
      setIsAccessGranted(true);
      // Retrieve plan name from localStorage if access is already granted
      try {
        const savedPlanName = localStorage.getItem('planName');
        if (savedPlanName) {
          setPlanName(savedPlanName);
        }
      } catch (error) {
        console.error('Failed to access localStorage:', error);
      }
    }
  }, []);

  // Callback function passed to AccessScreen to update the state upon successful login.
  const handleSuccess = (loggedInPlanName: string) => {
    // Set a cookie that expires in 1 day
    Cookies.set('accessGranted', 'true', { expires: 1 });
    // Save plan name to localStorage
    try {
        localStorage.setItem('planName', loggedInPlanName);
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
    setIsAccessGranted(true);
    setPlanName(loggedInPlanName);
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
    </div>
  );
}
