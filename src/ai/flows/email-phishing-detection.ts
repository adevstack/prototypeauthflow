// 'use server'
'use server';

/**
 * @fileOverview Email phishing detection flow for identifying potential phishing attempts during the password recovery process.
 *
 * - detectEmailPhishing - A function that takes an email address and checks if it is likely to be used for phishing.
 * - DetectEmailPhishingInput - The input type for the detectEmailPhishing function.
 * - DetectEmailPhishingOutput - The return type for the detectEmailPhishing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectEmailPhishingInputSchema = z.object({
  emailAddress: z
    .string()
    .email()
    .describe('The email address to check for potential phishing.'),
});
export type DetectEmailPhishingInput = z.infer<typeof DetectEmailPhishingInputSchema>;

const DetectEmailPhishingOutputSchema = z.object({
  isPhishingLikely: z
    .boolean()
    .describe(
      'Whether the email address is likely to be used for phishing, based on public information.'
    ),
  reason: z
    .string()
    .describe('The reasoning behind the phishing determination, if any.'),
});
export type DetectEmailPhishingOutput = z.infer<typeof DetectEmailPhishingOutputSchema>;

export async function detectEmailPhishing(
  input: DetectEmailPhishingInput
): Promise<DetectEmailPhishingOutput> {
  return detectEmailPhishingFlow(input);
}

const detectEmailPhishingPrompt = ai.definePrompt({
  name: 'detectEmailPhishingPrompt',
  input: {schema: DetectEmailPhishingInputSchema},
  output: {schema: DetectEmailPhishingOutputSchema},
  prompt: `You are an AI assistant specialized in identifying potential email phishing attempts.

  Based on the provided email address, analyze publicly available information to determine
  if the email address is likely to be used for phishing activities. Consider factors such as domain age,
  reputation, historical data breaches, and any other relevant information that might indicate malicious intent.

  Email Address: {{{emailAddress}}}

  Provide a detailed reasoning for your determination.

  {{output}}
  `,
});

const detectEmailPhishingFlow = ai.defineFlow(
  {
    name: 'detectEmailPhishingFlow',
    inputSchema: DetectEmailPhishingInputSchema,
    outputSchema: DetectEmailPhishingOutputSchema,
  },
  async input => {
    const {output} = await detectEmailPhishingPrompt(input);
    return output!;
  }
);
