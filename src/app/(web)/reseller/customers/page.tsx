
'use client';

import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function CustomersPage() {
  return (
    <ResellerLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Customers
            </h1>
            <p className="text-muted-foreground">
              Manage your customer information here.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Customer list and management features will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </ResellerLayout>
  );
}
