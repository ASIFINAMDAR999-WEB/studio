"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Plan } from "@/lib/data"

export function PlanCard({ plan }: { plan: Plan }) {
  const isContactAdmin = plan.cta === 'Contact Admin';

  return (
    <Card className={cn(
      "group flex flex-col rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl border relative overflow-hidden", 
      plan.highlight ? "border-primary ring-2 ring-primary" : "border-border",
      plan.isHot ? "hover:-translate-y-3" : "hover:-translate-y-2"
    )}>
      <div className={cn("absolute top-0 left-0 w-full h-full bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100", plan.highlight ? "bg-primary/20" : "")} />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/10 to-transparent opacity-50 -translate-x-full transition-transform duration-700 group-hover:translate-x-0" />
      <CardHeader className="p-6 text-center z-10">
        <div className="flex justify-center items-center gap-4 mb-2">
            <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
            {plan.isHot && <Badge variant="destructive" className="bg-red-500 text-white">HOT</Badge>}
        </div>
        
        {plan.priceOptions ? (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-3">Choose an amount:</p>
            <div className="flex justify-center items-center flex-wrap gap-2">
              {plan.priceOptions.map((price, index) => (
                <Badge key={index} variant="secondary" className="text-lg font-bold px-4 py-1">{price}</Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold tracking-tighter">{plan.priceString}</span>
              <span className="text-muted-foreground">{plan.duration}</span>
          </div>
        )}

        <CardDescription className="mt-2 min-h-[40px]">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-6 pt-0 z-10">
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
      <CardFooter className="p-6 pt-0 mt-4 z-10">
        <Button 
          asChild={!isContactAdmin}
          className="w-full text-lg py-6 transition-transform duration-300 group-hover:scale-105 animate-press" 
          variant={plan.highlight ? 'default' : 'outline'}
        >
          {isContactAdmin ? (
            <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">{plan.cta}</a>
          ) : (
            <Link href={`/payment/select?plan=${encodeURIComponent(plan.name)}`}>{plan.cta}</Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
