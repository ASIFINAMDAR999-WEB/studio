
'use client';

import { motion } from 'framer-motion';
import { StatCards } from './stats-cards';
import { RevenueChart } from './revenue-chart';
import { RecentOrdersTable } from './recent-orders-table';
import { ResellerSettings } from './reseller-settings';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function ResellerDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 space-y-8 p-4 md:p-8 pt-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <div>
              <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
                Reseller Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your white-labeled business from one central hub.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCards />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <RevenueChart />
        </motion.div>
        <motion.div variants={itemVariants}>
          <RecentOrdersTable />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <ResellerSettings />
      </motion.div>
    </motion.div>
  );
}
