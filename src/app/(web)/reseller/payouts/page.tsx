
'use client';

import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function PayoutsPage() {
  return (
    <ResellerLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
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
        <Card>
          <CardHeader>
            <CardTitle>Payout History & Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Payout history and management settings will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </ResellerLayout>
  );
}
