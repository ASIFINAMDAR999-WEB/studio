
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ResellerDashboard } from '@/components/reseller/reseller-dashboard';

export default function ResellerPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-muted/40">
      <Header />
      <main className="flex-1">
        <ResellerDashboard />
      </main>
      <Footer />
    </div>
  );
}
