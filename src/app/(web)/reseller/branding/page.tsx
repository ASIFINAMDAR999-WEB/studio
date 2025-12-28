
'use client';

import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { ResellerSettings } from '@/components/reseller/reseller-settings';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';

export default function BrandingPage() {
  return (
    <ResellerLayout>
      <motion.div 
        className="flex-1 space-y-8 p-4 md:p-8 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
           <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Branding & Customization
            </h1>
            <p className="text-muted-foreground">
              Customize the appearance of your white-labeled service.
            </p>
          </div>
        </div>
        <ResellerSettings />
      </motion.div>
    </ResellerLayout>
  );
}
