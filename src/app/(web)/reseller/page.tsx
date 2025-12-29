
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AnimatePresence } from 'framer-motion';
import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { ResellerDashboard } from '@/components/reseller/reseller-dashboard';
import { ResellerLoginScreen } from '@/components/reseller/reseller-login-screen';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ResellerPage() {
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  useEffect(() => {
    const accessCookie = Cookies.get('resellerAccessGranted');
    if (accessCookie === 'true') {
      setIsAccessGranted(true);
    }
  }, []);

  const handleSuccess = () => {
    Cookies.set('resellerAccessGranted', 'true', { expires: 1 });
    setIsAccessGranted(true);
  };

  if (!isAccessGranted) {
    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <AnimatePresence mode="wait">
                    <ResellerLoginScreen key="reseller-login-screen" onSuccess={handleSuccess} />
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <ResellerLayout>
      <ResellerDashboard />
    </ResellerLayout>
  );
}
