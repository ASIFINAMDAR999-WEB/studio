
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

interface ResellerHeaderProps {
  title: string;
  description: string;
}

export function ResellerHeader({ title, description }: ResellerHeaderProps) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
