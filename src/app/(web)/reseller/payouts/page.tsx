
'use client';

import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';

export default function PayoutsPage() {
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
              Payouts
            </h1>
            <p className="text-muted-foreground">
              Track your earnings and manage payout settings.
            </p>
          </div>
        </div>
        <Card className="shadow-lg transition-all duration-300 hover:shadow-glow">
          <CardHeader>
            <CardTitle>Payout History & Settings</CardTitle>
            <CardDescription>Manage your payouts and view your earnings history.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="text-center py-12 text-muted-foreground">
              <p>Payout management is under construction.</p>
              <p>You'll soon be able to configure your payout methods and track your earnings here.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </ResellerLayout>
  );
}
