
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Zap, CircleDollarSign, HelpCircle, Bot, Send, ShieldCheck, Users, Gift } from "lucide-react";
import { motion } from 'framer-motion';

type NavLinksProps = {
  onLinkClick?: () => void;
  isMobile?: boolean;
  itemVariants?: any;
};

export const NavLinks = ({ onLinkClick, isMobile = false, itemVariants }: NavLinksProps) => {
  const pathname = usePathname();

  const links = [
    { href: "/#features", label: "Features", icon: <Zap className="h-5 w-5" /> },
    { href: "/#pricing", label: "Pricing", icon: <CircleDollarSign className="h-5 w-5" /> },
    { href: "/reseller", label: "Reseller", icon: <Users className="h-5 w-5" /> },
    { href: "/#faq", label: "FAQ", icon: <HelpCircle className="h-5 w-5" /> },
    { href: "/bots", label: "Bots", icon: <Bot className="h-5 w-5" /> },
    { href: "/contact", label: "Contact", icon: <Send className="h-5 w-5" /> },
    { href: "/custom-plan", label: "Custom Plan", icon: <Gift className="h-5 w-5" /> },
    { href: "/access", label: "Access", icon: <ShieldCheck className="h-5 w-5" /> },
  ];

  const checkIsActive = (href: string) => {
    if (href.startsWith('/#')) {
      if (typeof window !== 'undefined') {
        const hash = href.substring(1);
        if (pathname === '/') {
           return window.location.hash === hash;
        }
      }
      return false;
    }
    if (href === '/reseller') {
      return pathname.startsWith('/reseller');
    }
    return pathname === href;
  };

  if (!isMobile) {
    return (
      <>
        {links.map((link) => {
          const isActive = checkIsActive(link.href);
          return (
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <a 
                onClick={onLinkClick}
                className={cn(
                  "relative transition-colors p-2 md:p-0 rounded-md md:rounded-none text-base font-medium group",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
                 <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-primary w-full transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
                    isActive ? "scale-x-100" : "scale-x-0"
                 )}/>
              </a>
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <>
      {links.map((link) => {
        const isActive = checkIsActive(link.href);
        return (
            <motion.div key={link.href} variants={itemVariants}>
              <Link 
                href={link.href} 
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg text-base font-medium transition-colors duration-300 transform-gpu",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                    : "text-foreground hover:bg-muted/80 hover:text-primary hover:translate-x-1"
                )}
              >
                <span className={cn(isActive ? 'text-primary-foreground' : 'text-muted-foreground')}>{link.icon}</span>
                {link.label}
              </Link>
            </motion.div>
        )
      })}
    </>
  );
};
