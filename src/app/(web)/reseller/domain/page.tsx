
'use client';

import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { ResellerSettings } from '@/components/reseller/reseller-settings';
import { ResellerHeader } from '@/components/reseller/reseller-header';
import { motion } from 'framer-motion';

export default function DomainPage() {
  return (
    <ResellerLayout>
      <motion.div
        className="flex-1 space-y-8 p-4 md:p-8 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResellerHeader
          title="Custom Domain"
          description="Set up and manage your custom domain."
        />
        <ResellerSettings />
      </motion.div>
    </ResellerLayout>
  );
}
