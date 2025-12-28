
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const orders = [
  { customer: 'Olivia Martin', plan: 'Platinum Plan', amount: '$180.00', status: 'Paid' },
  { customer: 'Jackson Lee', plan: 'Gold Plan', amount: '$150.00', status: 'Paid' },
  { customer: 'Isabella Nguyen', plan: 'Diamond Plan', amount: '$260.00', status: 'Paid' },
  { customer: 'William Kim', plan: 'Silver Plan - $50', amount: '$50.00', status: 'Pending' },
  { customer: 'Sofia Davis', plan: 'Platinum Pro', amount: '$400.00', status: 'Paid' },
  { customer: 'Ava Garcia', plan: 'Platinum Plan', amount: '$180.00', status: 'Paid' },
];

export function RecentOrdersTable() {
  return (
    <Card className="h-full flex flex-col shadow-lg transition-all duration-300 hover:shadow-2xl">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Your latest customer orders.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-[350px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.customer}>
                  <TableCell>
                    <div className="font-medium">{order.customer}</div>
                  </TableCell>
                  <TableCell>{order.plan}</TableCell>
                  <TableCell className="text-right">{order.amount}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={order.status === 'Paid' ? 'default' : 'secondary'} className={order.status === 'Paid' ? 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30' : ''}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
