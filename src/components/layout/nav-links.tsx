
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Zap, CircleDollarSign, HelpCircle, Bot, Send, ShieldCheck } from "lucide-react";

type NavLinksProps = {
  onLinkClick?: () => void;
  isMobile?: boolean;
};

export const NavLinks = ({ onLinkClick, isMobile = false }: NavLinksProps) => {
  const pathname = usePathname();

  const links = [
    { href: "/#features", label: "Features", icon: <Zap className="h-5 w-5" /> },
    { href: "/#pricing", label: "Pricing", icon: <CircleDollarSign className="h-5 w-5" /> },
    { href: "/#faq", label: "FAQ", icon: <HelpCircle className="h-5 w-5" /> },
    { href: "/bots", label: "Bots", icon: <Bot className="h-5 w-5" /> },
    { href: "/contact", label: "Contact", icon: <Send className="h-5 w-5" /> },
    { href: "/access", label: "Access", icon: <ShieldCheck className="h-5 w-5" /> },
  ];

  const checkIsActive = (href: string) => {
    if (href.startsWith('/#')) {
      return pathname === '/' && window.location.hash === href.substring(1);
    }
    return pathname.startsWith(href) && (href !== '/' || pathname === '/');
  };

  if (!isMobile) {
    return (
      <>
        {links.map((link) => {
          const isActive = checkIsActive(link.href);
          return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={onLinkClick}
                className={cn(
                  "transition-colors hover:text-primary p-2 md:p-0 rounded-md md:rounded-none text-base font-medium",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
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
            <Link 
              key={link.href}
              href={link.href} 
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg text-base font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
              )}
            >
              <span className={cn(isActive ? 'text-primary' : 'text-muted-foreground')}>{link.icon}</span>
              {link.label}
            </Link>
        )
      })}
    </>
  );
};
