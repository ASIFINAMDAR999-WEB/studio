
import { plans } from '@/lib/data';
import { PlanCard } from '@/components/plan-card';
import { PlanRecommender } from '../plan-recommender';
import { Card, CardContent } from '../ui/card';

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
           <h2 className="text-3xl md:text-4xl font-bold">Our Plans</h2>
           <p className="mt-4 text-muted-foreground">
              Choose the plan that's right for you. All plans come with our top-notch features and support.
           </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
          {plans.map((plan, i) => (
            <div key={plan.name} className="animate-stagger-item" style={{'--stagger-index': i + 1} as React.CSSProperties}>
                <PlanCard plan={plan} />
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-3xl mx-auto mt-20 animate-fade-in-up">
           <h2 className="text-3xl md:text-4xl font-bold">Not Sure Which Plan to Choose?</h2>
           <p className="mt-4 text-muted-foreground">
              Let our AI assistant help you find the perfect plan based on your needs.
           </p>
        </div>
        <Card className="mt-8 max-w-2xl mx-auto shadow-lg animate-fade-in-up [animation-delay:200ms]">
          <CardContent className="p-6">
            <PlanRecommender />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
