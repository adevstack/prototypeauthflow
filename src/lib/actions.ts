// 'use server'
"use server";

import { detectEmailPhishing, DetectEmailPhishingInput, DetectEmailPhishingOutput } from "@/ai/flows/email-phishing-detection";
import { captchaReminder, CaptchaReminderInput, CaptchaReminderOutput } from "@/ai/flows/captcha-reminder";

export async function checkEmailForPhishing(email: string): Promise<DetectEmailPhishingOutput> {
  try {
    const input: DetectEmailPhishingInput = { emailAddress: email };
    const result = await detectEmailPhishing(input);
    return result;
  } catch (error) {
    console.error("Error in detectEmailPhishing flow:", error);
    return {
      isPhishingLikely: false, // Default to false on error to not block legitimate users
      reason: "Error occurred during phishing check.",
    };
  }
}

export async function getCaptchaReminder(applicationType: string, loginSecurityConcerns: string): Promise<CaptchaReminderOutput> {
  try {
    const input: CaptchaReminderInput = { applicationType, loginSecurityConcerns };
    const result = await captchaReminder(input);
    return result;
  } catch (error) {
    console.error("Error in captchaReminder flow:", error);
    return {
      captchaProviderSuggestion: "Error fetching suggestion.",
      reminderMessage: "Could not generate reminder due to an error.",
    };
  }
}