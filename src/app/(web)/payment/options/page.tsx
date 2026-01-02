
'use client';

import { Suspense } from 'react';
import { PaymentOptionsComponent } from '@/components/payment/payment-options-component';
import { Loader } from '@/components/loader';

export default function PaymentOptionsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentOptionsComponent />
    </Suspense>
  );
}
