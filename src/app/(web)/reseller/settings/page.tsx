
'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { ResellerSettings } from '@/components/reseller/reseller-settings';
import { ResellerHeader } from '@/components/reseller/reseller-header';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    const accessCookie = Cookies.get('resellerAccessGranted');
    if (accessCookie !== 'true') {
      router.replace('/reseller/login');
    }
  }, [router]);

  return (
    <ResellerLayout>
      <motion.div
        className="flex-1 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResellerHeader
          title="Settings"
          description="Manage your reseller account settings."
        />
        <ResellerSettings />
      </motion.div>
    </ResellerLayout>
  );
}
