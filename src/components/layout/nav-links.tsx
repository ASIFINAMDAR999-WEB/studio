
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  onLinkClick?: () => void;
};

export const NavLinks = ({ onLinkClick }: NavLinksProps) => {
  const pathname = usePathname();

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#cta", label: "Contact" },
  ];

  return (
    <>
      {links.map((link, index) => (
        <Link 
          key={link.href}
          href={link.href} 
          onClick={onLinkClick}
          className="text-muted-foreground transition-colors hover:text-primary animate-fade-in-up md:animate-none p-2 md:p-0 rounded-md md:rounded-none"
          style={{ animationDelay: `${index * 100 + 300}ms` }}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};
