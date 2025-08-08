
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  onLinkClick?: () => void;
};

export const NavLinks = ({ onLinkClick }: NavLinksProps) => {
  const pathname = usePathname();

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
    { href: "/bots", label: "Bots" },
    { href: "/contact", label: "Contact" },
    { href: "/access", label: "Access" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={onLinkClick}
              className={cn(
                "transition-colors hover:text-primary p-2 md:p-0 rounded-md md:rounded-none",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
        )
      })}
    </>
  );
};
