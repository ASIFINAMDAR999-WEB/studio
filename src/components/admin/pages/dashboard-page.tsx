'use client';

import { PageHeader } from '@/components/admin/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { adminDashboardStats } from '@/lib/admin-data';
import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartData = [
  { month: 'Apr', revenue: 1860 },
  { month: 'May', revenue: 3050 },
  { month: 'Jun', revenue: 2370 },
  { month: 'Jul', revenue: 7300 },
  { month: 'Aug', revenue: 4900 },
  { month: 'Sep', revenue: 6200 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function DashboardPage() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };
  
  const totalRevenue = useMemo(() => {
    return chartData.reduce((acc, item) => acc + item.revenue, 0);
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to your reseller dashboard. Here's a quick overview of your business."
      />
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {adminDashboardStats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.isCurrency ? `$${stat.value}` : stat.value}
                </div>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }}
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}