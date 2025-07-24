'use server';

/**
 * @fileOverview A plan recommendation AI agent.
 *
 * - recommendPlan - A function that handles the plan recommendation process.
 * - RecommendPlanInput - The input type for the recommendPlan function.
 * - RecommendPlanOutput - The return type for the recommendPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPlanInputSchema = z.object({
  desiredFeatures: z.string().describe('The desired calling features.'),
  budget: z.number().describe('The budget for the plan.'),
});
export type RecommendPlanInput = z.infer<typeof RecommendPlanInputSchema>;

const RecommendPlanOutputSchema = z.object({
  planName: z.string().describe('The name of the recommended plan (Silver, Gold, Diamond, or Platinum).'),
  reason: z.string().describe('The reason for recommending this plan.'),
});
export type RecommendPlanOutput = z.infer<typeof RecommendPlanOutputSchema>;

export async function recommendPlan(input: RecommendPlanInput): Promise<RecommendPlanOutput> {
  return recommendPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPlanPrompt',
  input: {schema: RecommendPlanInputSchema},
  output: {schema: RecommendPlanOutputSchema},
  prompt: `You are a helpful assistant that recommends a top-up plan (Silver, Gold, Diamond, or Platinum) based on the user's desired calling features and budget.

  Here are the available plans:
  👑 𝐒𝐈𝐋𝐕𝐄𝐑 𝐏𝐋𝐀𝐍𝐒 👑
     $𝟓𝟎 | $𝟏𝟎𝟎 | $𝟐𝟓𝟎 | $𝟓𝟎𝟎
  • Manual top-up via @AF3092
  • Only for virtual number's and esim

  👑 𝐆𝐎𝐋𝐃 𝐏𝐋𝐀𝐍 — $𝟗𝟎  👑
  1 Month Unlimited Calling — no per-minute charges
  Includes:
  • Full Call Spoofing
  • Standard Voice Changer
  • Website & Application Access

  👑 𝐃𝐈𝐀𝐌𝐎𝐍𝐃 𝐏𝐋𝐀𝐍 — $𝟐𝟎𝟎 👑
  2Months Unlimited Calling — no per-minute charges
  Includes:
  • Advanced Call Spoofing
  • Premium Voice Changer
  • Enhanced Call Routing
  • Advance Otp bot Access
  • Website & Application Access
  • Email & SMS Spoofing Access
  • IVR System
  • Toll-Free Number Spoofing
  • SIP Trunk Access

  👑 𝐏𝐋𝐀𝐓𝐈𝐍𝐔𝐌 𝐏𝐋𝐀𝐍 —  $𝟑𝟎𝟎  👑
  3Months Unlimited Calling — no per-minute charges
  Includes all premium features:
  • Advanced Call Spoofing
  • Premium Voice Changer
  • Enhanced Routing
  • Priority Support
  • Advance Otp bot Access
  • Full API & Custom Integration
  • Website & Application Access
  • Email & SMS Spoofing Access
  • IVR System
  • Premium Toll-Free Number Spoofing
  • Premium SIP Trunk Access

  👑 𝐏𝐋𝐀𝐓𝐈𝐍𝐔𝐌 𝟏-𝐌𝐎𝐍𝐓𝐇
   𝐏𝐋𝐀𝐍 — $𝟏𝟎𝟎 👑
  1 Months Unlimited Calling — no per-minute charges
  Includes all premium features:
  • Full Call Spoofing
  • Premium Voice Changer
  • Enhanced Routing
  • Priority Support
  • Advance Otp bot Access
  • Website & Application Access
  • Email & SMS Spoofing Access
  • IVR System
  • Premium Toll-Free Number Spoofing
  • Premium SIP Trunk Access

  Here is the user's input:
  Desired Features: {{{desiredFeatures}}}
  Budget: {{{budget}}}

  Based on the user's desired features and budget, recommend the most suitable top-up plan (Silver, Gold, Diamond, or Platinum). Explain your reasoning.

  {{#if desiredFeatures}}
  I recommend the {{{planName}}} plan because {{{reason}}}.
  {{else}}
  Please provide your desired features to get a plan recommendation.
  {{/if}}
`,
});

const recommendPlanFlow = ai.defineFlow(
  {
    name: 'recommendPlanFlow',
    inputSchema: RecommendPlanInputSchema,
    outputSchema: RecommendPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
