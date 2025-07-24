"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { recommendPlan, type RecommendPlanOutput } from '@/ai/flows/plan-recommender';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  desiredFeatures: z.string().min(10, { message: "Please describe your needs in a bit more detail (at least 10 characters)." }),
  budget: z.coerce.number({invalid_type_error: "Please enter a valid number for your budget."}).positive({ message: "Budget must be a positive number." }),
});

export function PlanRecommender() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendPlanOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredFeatures: '',
      budget: 100,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setRecommendation(null);
    try {
      const result = await recommendPlan(values);
      setRecommendation(result);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Sorry, we couldn't generate a recommendation. Please try again later.",
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg rounded-xl">
      <CardHeader className="text-center p-6">
        <Sparkles className="mx-auto h-8 w-8 text-primary" />
        <CardTitle className="font-headline text-2xl mt-2">Can't Decide?</CardTitle>
        <CardDescription>Let our AI assistant recommend the perfect plan for you.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 p-6">
            <FormField
              control={form.control}
              name="desiredFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What features are you looking for?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., I need call spoofing and access to an OTP bot for my business..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your monthly budget? (in USD)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="150" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6 pt-0">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                'Get Recommendation'
              )}
            </Button>
            {recommendation && (
              <Alert className="w-full text-left bg-primary/10 border-primary/50 mt-4">
                <Sparkles className="h-4 w-4 !text-primary" />
                <AlertTitle className="font-headline text-primary">Our Recommendation: {recommendation.planName}</AlertTitle>
                <AlertDescription>
                  {recommendation.reason}
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
