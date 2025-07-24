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
  description: string;
  features: string[];
  highlight: boolean;
  cta: string;
  ctaLink: string;
  isSpecialOffer?: boolean;
};

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Card className={cn(
      "flex flex-col rounded-xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2", 
      plan.highlight && "border-primary ring-2 ring-primary shadow-primary/20"
    )}>
      <CardHeader className="p-6">
        <div className="flex justify-between items-start mb-4">
          <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
          {plan.isSpecialOffer && <Badge variant="default" className="bg-accent text-accent-foreground">Offer</Badge>}
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-headline tracking-tighter">{plan.priceString}</span>
            <span className="text-muted-foreground">/ {plan.duration}</span>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-6 pt-0">
        <ul className="space-y-3 text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-3 shrink-0 mt-1" />
              <span className="text-card-foreground/90">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-4">
        <Button asChild className="w-full text-lg py-6" variant={plan.highlight ? 'default' : 'secondary'}>
          <Link href={plan.ctaLink} target="_blank" rel="noopener noreferrer">{plan.cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
