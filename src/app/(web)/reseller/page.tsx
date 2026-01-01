
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AnimatePresence } from 'framer-motion';
import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { ResellerDashboard } from '@/components/reseller/reseller-dashboard';
import { ResellerLoginScreen } from '@/components/reseller/reseller-login-screen';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useRouter } from 'next/navigation';

export default function ResellerPage() {
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessCookie = Cookies.get('resellerAccessGranted');
    if (accessCookie === 'true') {
      setIsAccessGranted(true);
    } else {
        // Redirect to login if not granted
        router.replace('/reseller/login');
    }
  }, [router]);

  // This will show a loading state or nothing while the check is happening
  if (!isAccessGranted) {
    return null; 
  }

  return (
    <ResellerLayout>
      <ResellerDashboard />
    </ResellerLayout>
  );
}
