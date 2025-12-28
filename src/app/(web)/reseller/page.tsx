
'use client';

import { ResellerLayout } from '@/components/reseller/reseller-layout';
import { ResellerDashboard } from '@/components/reseller/reseller-dashboard';

export default function ResellerPage() {
  return (
    <ResellerLayout>
      <ResellerDashboard />
    </ResellerLayout>
  );
}
