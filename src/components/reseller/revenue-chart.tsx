
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTheme } from 'next-themes';

const data = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
  { month: 'Jul', revenue: 7000 },
  { month: 'Aug', revenue: 6500 },
  { month: 'Sep', revenue: 7500 },
  { month: 'Oct', revenue: 8000 },
  { month: 'Nov', revenue: 9000 },
  { month: 'Dec', revenue: 8500 },
];

export function RevenueChart() {
  const { theme } = useTheme();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Month
              </span>
              <span className="font-bold text-muted-foreground">
                {label}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Revenue
              </span>
              <span className="font-bold">
                ${payload[0].value.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col shadow-lg transition-all duration-300 hover:shadow-glow">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Your total revenue over the last 12 months.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--primary) / 0.1)', radius: 8 }}
              content={<CustomTooltip />}
            />
            <Bar 
              dataKey="revenue" 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]} 
              style={{
                filter: `drop-shadow(0 4px 8px hsl(var(--primary) / 0.3))`
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
