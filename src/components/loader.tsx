
import { Shield } from 'lucide-react';

export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <div className="animate-glow-pulse">
        <Shield className="h-20 w-20 text-primary" />
      </div>
    </div>
  );
}
