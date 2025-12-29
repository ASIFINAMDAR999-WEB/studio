
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { ResellerLoginScreen } from '@/components/reseller/reseller-login-screen';
import { Header } from '@/components/layout/header';

export default function ResellerLoginPage() {
  const router = useRouter();

  const handleSuccess = () => {
    Cookies.set('resellerAccessGranted', 'true', { expires: 1 });
    router.push('/reseller');
  };

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (Cookies.get('resellerAccessGranted') === 'true') {
      router.replace('/reseller');
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <ResellerLoginScreen key="reseller-login-screen" onSuccess={handleSuccess} />
        </AnimatePresence>
      </main>
    </div>
  );
}
