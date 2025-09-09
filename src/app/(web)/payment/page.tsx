
'use client';

import { Suspense } from 'react';
import { PaymentPageComponent } from '@/components/payment/payment-page-component';
import { Loader } from '@/components/loader';

export default function PaymentPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentPageComponent />
    </Suspense>
  );
}
