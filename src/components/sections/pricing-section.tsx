import { plans } from '@/lib/data';
import { PlanCard } from '@/components/plan-card';
import { Separator } from '@/components/ui/separator';

export function PricingSection() {
  const subscriptionPlans = plans.filter(p => !p.priceOptions);
  const topUpPlan = plans.find(p => p.priceOptions);

  return (
    <section id="pricing" className="py-20 md:py-28" aria-labelledby="pricing-heading">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in-up">
           <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold font-headline">Our Plans</h2>
           <p className="mt-4 text-muted-foreground">
              Choose the plan that's right for you. All plans come with our top-notch features and support.
           </p>
        </div>
        
        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start justify-center">
          {subscriptionPlans.map((plan, i) => (
            <div key={plan.name} className="animate-in fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <PlanCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Top-up Plan */}
        {topUpPlan && (
          <>
            <div className="my-16 animate-in fade-in-up" style={{animationDelay: '600ms'}}>
              <Separator />
            </div>
            <div className="flex justify-center animate-in fade-in-up" style={{animationDelay: '750ms'}}>
              <div className="w-full sm:max-w-md">
                <PlanCard plan={topUpPlan} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
