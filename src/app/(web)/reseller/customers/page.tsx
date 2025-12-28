
'use client';

import { useState } from 'react';
import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ShieldCheck, Copy, PauseCircle, PlayCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ResellerHeader } from '@/components/reseller/reseller-header';


type CustomerStatus = 'Active' | 'Suspended' | 'Terminated';

type Customer = {
  id: string;
  name: string;
  email: string;
  plan: string;
  accessCode: string;
  status: CustomerStatus;
};

const initialCustomers: Customer[] = [
  { id: 'cus_1', name: 'Olivia Martin', email: 'olivia.m@example.com', plan: 'Platinum Plan', accessCode: 'platinum:1111', status: 'Active' },
  { id: 'cus_2', name: 'Jackson Lee', email: 'jackson.l@example.com', plan: 'Gold Plan', accessCode: 'gold:2222', status: 'Active' },
  { id: 'cus_3', name: 'Isabella Nguyen', email: 'isabella.n@example.com', plan: 'Diamond Plan', accessCode: 'diamond:2222', status: 'Suspended' },
  { id: 'cus_4', name: 'William Kim', email: 'will.k@example.com', plan: 'Platinum Pro', accessCode: 'platinumpro:3333', status: 'Active' },
  { id: 'cus_5', name: 'Sofia Davis', email: 'sofia.d@example.com', plan: 'Platinum Plan', accessCode: 'platinum:4444', status: 'Terminated' },
  { id: 'cus_6', name: 'Liam Brown', email: 'liam.b@example.com', plan: 'Gold Plan', accessCode: 'gold:5555', status: 'Active' },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const { toast } = useToast();

  const handleStatusChange = (customerId: string, newStatus: CustomerStatus) => {
    setCustomers(customers.map(c => c.id === customerId ? { ...c, status: newStatus } : c));
    toast({
      title: 'Customer Updated',
      description: `The customer's account has been ${newStatus.toLowerCase()}.`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: 'The access code has been copied.',
    });
  };

  const statusStyles: Record<CustomerStatus, string> = {
    Active: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30',
    Suspended: 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30',
    Terminated: 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30',
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };


  return (
    <ResellerLayout>
      <motion.div
        className="flex-1 space-y-8 p-4 md:p-8 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResellerHeader
          title="Customers"
          description="Manage your customer accounts and access."
        />
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="shadow-lg transition-all duration-300 hover:shadow-glow">
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View, manage, and monitor your customer accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Plan</TableHead>
                      <TableHead className="hidden lg:table-cell">Access Code</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <motion.tr key={customer.id} variants={itemVariants} className="transition-colors hover:bg-muted/50">
                        <TableCell>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground md:hidden">{customer.plan}</div>
                          <div className="text-xs text-muted-foreground">{customer.email}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{customer.plan}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-2 font-mono text-xs">
                             <Tooltip>
                                <TooltipTrigger asChild>
                                  <span 
                                    className="cursor-pointer truncate max-w-[120px]"
                                    onClick={() => copyToClipboard(customer.accessCode)}
                                  >
                                    {customer.accessCode}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Click to copy</p>
                                </TooltipContent>
                              </Tooltip>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(customer.accessCode)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={cn("font-semibold", statusStyles[customer.status])}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0" disabled={customer.status === 'Terminated'}>
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                               {customer.status === 'Active' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(customer.id, 'Suspended')}>
                                  <PauseCircle className="mr-2 h-4 w-4" />
                                  <span>Suspend Access</span>
                                </DropdownMenuItem>
                              )}
                              {customer.status === 'Suspended' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(customer.id, 'Active')}>
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  <span>Reactivate Access</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => copyToClipboard(customer.accessCode)}>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Copy Access Code</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleStatusChange(customer.id, 'Terminated')}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>Terminate Access</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </TooltipProvider>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ResellerLayout>
  );
}
