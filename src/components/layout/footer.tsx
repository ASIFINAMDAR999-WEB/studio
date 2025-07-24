
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-8 border-t bg-card">
      <div className="container mx-auto px-4 sm:px-6 text-center text-muted-foreground">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Link href="/terms-of-service" className="text-sm hover:underline">Terms of Service</Link>
          <Link href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} CallCraft. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
