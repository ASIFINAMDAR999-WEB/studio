
'use client';

import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { ResellerSettings } from '@/components/reseller/reseller-settings';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DomainPage() {
  return (
    <ResellerLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Custom Domain
            </h1>
            <p className="text-muted-foreground">
              Set up and manage your custom domain.
            </p>
          </div>
        </div>
        <ResellerSettings />
      </div>
    </ResellerLayout>
  );
}
