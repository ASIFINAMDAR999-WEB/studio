
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Plan = {
  name: string;
  priceString: string;
  duration: string;
  features: string[];
  highlight: boolean;
  cta: string;
  isHot?: boolean;
};

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Card className={cn(
      "flex flex-col rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1 border animate-fade-in", 
      plan.highlight ? "border-primary ring-2 ring-primary" : "border-border"
    )}>
      <CardHeader className="p-6 text-center">
        <div className="flex justify-center items-center gap-4 mb-2">
            <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
            {plan.isHot && <Badge variant="destructive" className="bg-red-500 text-white">HOT</Badge>}
        </div>
        
        <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold tracking-tighter">{plan.priceString}</span>
            <span className="text-muted-foreground">{plan.duration}</span>
        </div>
        <CardDescription className="mt-2">Per account</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-6 pt-0">
        <p className="text-sm font-semibold mb-4 text-center">This package includes:</p>
        <ul className="space-y-3 text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-4">
        <Button asChild className="w-full text-lg py-6" variant={plan.highlight ? 'default' : 'outline'}>
          <Link href={`/payment?plan=${encodeURIComponent(plan.name)}`}>{plan.cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
