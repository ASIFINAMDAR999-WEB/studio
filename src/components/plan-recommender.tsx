
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recommendPlan } from '@/ai/flows/plan-recommender';
import { Bot, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  desiredFeatures: z.string().min(10, 'Please describe what you need in a bit more detail.'),
  budget: z.coerce.number().positive('Please enter a valid budget.'),
});

type FormValues = z.infer<typeof formSchema>;

export function PlanRecommender() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{ planName: string, reason: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredFeatures: '',
      budget: 100,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await recommendPlan(values);
      setRecommendation(result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="desiredFeatures"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Tell me what you need, e.g., 'I need unlimited calling with a voice changer and SMS spoofing.'" {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input type="number" placeholder="Your budget in USD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Get Recommendation
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendation && (
         <Alert className="border-primary/50">
            <Bot className="h-4 w-4" />
            <AlertTitle className="font-bold">Our Recommendation: {recommendation.planName}</AlertTitle>
            <AlertDescription>
                {recommendation.reason}
            </AlertDescription>
         </Alert>
      )}
    </div>
  );
}
