
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  ShoppingCart,
  Brush,
  Globe,
  DollarSign,
  Settings,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '../theme-toggle';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Inter, Lexend } from 'next/font/google';
import { ResellerHeader } from './reseller-header';
import Cookies from 'js-cookie';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lexend',
  display: 'swap',
});

export function ResellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('resellerAccessGranted');
    router.push('/reseller/login');
  }

  const menuItems = [
    { href: '/reseller', label: 'Dashboard', icon: Home },
    { href: '/reseller/customers', label: 'Customers', icon: Users },
    { href: '/reseller/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/reseller/branding', label: 'Branding', icon: Brush },
    { href: '/reseller/domain', label: 'Domain', icon: Globe },
    { href: '/reseller/payouts', label: 'Payouts', icon: DollarSign },
  ];

  return (
    <div className={cn(inter.variable, lexend.variable, 'font-body bg-background')}>
      <SidebarProvider>
        <div className="min-h-screen">
          <Sidebar>
            <div className="absolute inset-0 bg-grid-pattern-small opacity-10 dark:opacity-5 [mask-image:radial-gradient(ellipse_at_top_right,white_5%,transparent_60%)] -z-10"></div>
            <SidebarHeader>
               <div className="flex items-center gap-3">
                 <Image src="https://bkbjdhvwwqqujhwjeaga.supabase.co/storage/v1/object/sign/My/Picsart_25-08-16_11-58-07-414.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hN2M1NGZkOS1iMjg3LTRiMGMtOTBkZS0wZDQ3Yjk2YjkzYmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeS9QaWNzYXJ0XzI1LTA4LTE2XzExLTU4LTA3LTQxNC5wbmciLCJpYXQiOjE3NTUzMjYxMjUsImV4cCI6MjA3MDY4NjEyNX0.HrqwzcCFG0oUt0HEewn9XZC4jXJhrWc_sLq1YGqStqE" alt="Logo" width={32} height={32} />
                 <span className="text-lg font-semibold font-headline text-sidebar-foreground">REDArmor 2.0</span>
               </div>
            </SidebarHeader>
            <SidebarContent className="p-2">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.label}
                      >
                        <a>
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
              <Separator className="mb-2" />
              <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/reseller/settings" passHref legacyBehavior>
                        <SidebarMenuButton tooltip="Settings" asChild isActive={pathname === '/reseller/settings'}>
                            <a>
                                <Settings/>
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Log Out" onClick={handleLogout}>
                        <LogOut />
                        <span>Log Out</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <main>{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
