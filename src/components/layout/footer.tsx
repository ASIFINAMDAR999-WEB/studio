
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-8 border-t bg-card">
      <div className="container mx-auto px-4 sm:px-6 text-center text-muted-foreground">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Link href="#" className="text-sm hover:underline">Terms of Service</Link>
          <Link href="#" className="text-sm hover:underline">Privacy Policy</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} 𝐑𝐄𝐃𝐀rm𝐨𝐫 𝐯𝟎.𝟐™. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
