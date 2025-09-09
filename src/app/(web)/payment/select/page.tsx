
'use client';

import { Suspense } from 'react';
import { SelectCryptoComponent } from '@/components/payment/select-crypto-component';
import { Loader } from '@/components/loader';

export default function SelectCryptoPage() {
    return (
        <Suspense fallback={<Loader />}>
            <SelectCryptoComponent />
        </Suspense>
    );
}
