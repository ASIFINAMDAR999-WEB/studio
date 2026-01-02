
'use client';

import { Suspense } from 'react';
import { OxaPayComponent } from '@/components/payment/oxapay-component';
import { Loader } from '@/components/loader';

export default function OxaPayPage() {
    return (
        <Suspense fallback={<Loader />}>
            <OxaPayComponent />
        </Suspense>
    );
}
