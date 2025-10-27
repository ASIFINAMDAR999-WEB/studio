
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-8 border-t bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 text-center text-muted-foreground">
        <div className="flex justify-center items-center gap-6 mb-4">
          <Link 
            href="/terms-of-service" 
            className="text-sm transition-colors duration-300 hover:text-primary"
          >
            Terms of Service
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-sm transition-colors duration-300 hover:text-primary"
          >
            Privacy Policy
          </Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <Link href="/" className="font-semibold text-primary hover:text-accent transition-colors duration-300">REDArmor 2.0</Link>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
