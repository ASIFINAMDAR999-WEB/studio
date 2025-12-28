
'use client';

import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResellerHeader } from '@/components/reseller/reseller-header';
import { motion } from 'framer-motion';

export default function OrdersPage() {
  return (
    <ResellerLayout>
      <motion.div
        className="flex-1 space-y-8 p-4 md:p-8 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResellerHeader
          title="Orders"
          description="View and manage all customer orders."
        />
        <Card className="shadow-lg transition-all duration-300 hover:shadow-glow">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>A detailed history of all orders will be available here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p>Order management features are currently being built.</p>
              <p>You will soon be able to track and manage all customer orders from this page.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </ResellerLayout>
  );
}
