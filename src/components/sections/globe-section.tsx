
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const GlobeAnimation = dynamic(() => import('@/components/globe-animation').then(mod => mod.GlobeAnimation), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center bg-background"><p>Loading Globe...</p></div>,
});


export function GlobeSection() {
    return (
        <section id="globe-section" className="py-20 md:py-28 bg-card/50">
            <div className="container px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold">Connecting The World</h2>
                    <p className="mt-4 text-muted-foreground">
                        Our infrastructure spans the globe, ensuring reliable and high-quality connections no matter where you are.
                    </p>
                </div>
                <div className="relative max-w-6xl mx-auto mt-16 h-[500px] animate-fade-in-up [animation-delay:200ms]">
                    <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><p>Loading...</p></div>}>
                        <GlobeAnimation />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
