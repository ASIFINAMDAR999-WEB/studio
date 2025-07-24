
import Link from "next/link";

export const NavLinks = () => (
  <>
    <Link href="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Features</Link>
    <Link href="/#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Pricing</Link>
    <Link href="/#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">FAQ</Link>
    <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contact</Link>
  </>
);

    