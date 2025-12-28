
'use client';

import { motion } from 'framer-motion';
import { StatCards } from './stats-cards';
import { RevenueChart } from './revenue-chart';
import { RecentOrdersTable } from './recent-orders-table';
import { ResellerSettings } from './reseller-settings';

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
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Reseller Dashboard
              </h1>
              <p className="mt-1 text-muted-foreground">
                Manage your white-labeled business from one central hub.
              </p>
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
    </div>
  );
}
