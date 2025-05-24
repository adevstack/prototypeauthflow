// use server'
'use server';

/**
 * @fileOverview This file defines a Genkit flow for reminding developers to add captcha to their login systems.
 *
 * @remarks
 * This flow uses GenAI to suggest a captcha provider and remind developers to add captcha to the login system for enhanced security.
 *
 * @exports `captchaReminder` - The main function to trigger the captcha reminder flow.
 * @exports `CaptchaReminderInput` - The input type for the `captchaReminder` function.
 * @exports `CaptchaReminderOutput` - The output type for the `captchaReminder` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CaptchaReminderInputSchema = z.object({
  applicationType: z.string().describe('The type of application being developed (e.g., web, mobile).'),
  loginSecurityConcerns: z
    .string()
    .describe('Any specific security concerns related to the login system.'),
});

export type CaptchaReminderInput = z.infer<typeof CaptchaReminderInputSchema>;

const CaptchaReminderOutputSchema = z.object({
  captchaProviderSuggestion: z
    .string()
    .describe('A suggestion for a suitable captcha provider based on the application type.'),
  reminderMessage: z.string().describe('A reminder message to add captcha to the login system.'),
});

export type CaptchaReminderOutput = z.infer<typeof CaptchaReminderOutputSchema>;

export async function captchaReminder(input: CaptchaReminderInput): Promise<CaptchaReminderOutput> {
  return captchaReminderFlow(input);
}

const captchaReminderPrompt = ai.definePrompt({
  name: 'captchaReminderPrompt',
  input: {schema: CaptchaReminderInputSchema},
  output: {schema: CaptchaReminderOutputSchema},
  prompt: `You are a security consultant advising developers on best practices for login systems.

  Based on the application type and any specific security concerns, suggest a captcha provider and remind the developer to add captcha to the login system.

  Application Type: {{{applicationType}}}
  Security Concerns: {{{loginSecurityConcerns}}}

  Here's the output format:
  {
   "captchaProviderSuggestion": "Suggestion for a captcha provider",
   "reminderMessage": "Reminder message to add captcha"
  }`,
});

const captchaReminderFlow = ai.defineFlow(
  {
    name: 'captchaReminderFlow',
    inputSchema: CaptchaReminderInputSchema,
    outputSchema: CaptchaReminderOutputSchema,
  },
  async input => {
    const {output} = await captchaReminderPrompt(input);
    return output!;
  }
);
