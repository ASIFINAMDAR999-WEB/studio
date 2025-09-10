
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Gift } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Plan } from "@/lib/data"

export function PlanCard({ plan }: { plan: Plan }) {
  const isContactAdmin = plan.cta === 'Contact Admin';

  return (
    <Card className={cn(
      "group flex flex-col rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl border relative overflow-hidden hover:-translate-y-2 h-full transform-gpu",
      "border-primary/50 dark:border-primary ring-2 ring-primary/50 dark:ring-primary"
    )}>
      <div className="absolute top-0 left-0 w-full h-full bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10" />
      
      <CardHeader className="p-6 text-center z-10">
        <div className="flex justify-center items-center gap-4 mb-2">
            <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
        </div>

        {plan.priceOptions ? (
          <div className="mt-2">
             <CardDescription className="mt-2 min-h-[40px]">{plan.description}</CardDescription>
          </div>
        ) : (
          <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold tracking-tighter">{plan.priceString}</span>
              <span className="text-muted-foreground">{plan.duration}</span>
          </div>
        )}

        {!plan.priceOptions && <CardDescription className="mt-2 min-h-[40px]">{plan.description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-6 pt-0 z-10">
        {plan.bonus && (
          <div className="mb-6">
            <div className="p-3 bg-primary/5 border-l-4 border-primary/50 rounded-r-md flex items-start gap-3">
              <Gift className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-bold text-primary">{plan.bonus.split(':')[0]}:</span>
                <span className="text-muted-foreground">
                  {plan.bonus.split(':')[1]}
                </span>
              </p>
            </div>
          </div>
        )}
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
      <CardFooter className="p-6 pt-0 mt-auto z-10">
        {plan.priceOptions ? (
           <div className="w-full flex flex-col gap-3">
                <p className="text-sm font-semibold text-center text-muted-foreground">Select an amount to top-up:</p>
                {plan.priceOptions.map((price) => (
                    <Button asChild key={price} variant="outline" className="w-full text-lg py-6 transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                        <Link href={`/payment/select?plan=${encodeURIComponent(`${plan.name} - ${price}`)}`}>
                            {price}
                        </Link>
                    </Button>
                ))}
           </div>
        ) : (
            <Button
              asChild={!isContactAdmin}
              className="w-full text-lg py-6 transition-transform duration-300 group-hover:scale-105"
            >
              {isContactAdmin ? (
                <a href="https://t.me/AF3092" target="_blank" rel="noopener noreferrer">{plan.cta}</a>
              ) : (
                <Link href={`/payment/select?plan=${encodeURIComponent(plan.name)}`}>{plan.cta}</Link>
              )}
            </Button>
        )}
      </CardFooter>
    </Card>
  )
}
