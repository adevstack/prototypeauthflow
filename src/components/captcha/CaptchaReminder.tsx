"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getCaptchaReminder } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lightbulb, Loader2, ShieldQuestion } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CaptchaReminderSchema = z.object({
  applicationType: z.string().min(3, { message: "Please describe your application type." }),
  loginSecurityConcerns: z.string().min(5, { message: "Please describe any security concerns." }),
});
type CaptchaReminderFormData = z.infer<typeof CaptchaReminderSchema>;

interface ReminderResult {
  captchaProviderSuggestion: string;
  reminderMessage: string;
}

export default function CaptchaReminder() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<ReminderResult | null>(null);

  const form = useForm<CaptchaReminderFormData>({
    resolver: zodResolver(CaptchaReminderSchema),
    defaultValues: {
      applicationType: "",
      loginSecurityConcerns: "",
    },
  });

  const onSubmit = async (data: CaptchaReminderFormData) => {
    setIsLoading(true);
    setResult(null);
    console.log("Captcha Reminder data:", data);
    
    try {
      const aiResult = await getCaptchaReminder(data.applicationType, data.loginSecurityConcerns);
      setResult(aiResult);
      toast({
        title: "Captcha Reminder Generated",
        description: "AI has provided suggestions for your captcha implementation.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get captcha reminder from AI.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
           <ShieldQuestion className="h-12 w-12 text-primary mx-auto mb-2" />
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">Captcha Reminder Tool</CardTitle>
          <CardDescription className="text-md pt-1">
            Get AI-powered suggestions for implementing Captcha in your login system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="applicationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Web App, Mobile App, B2B SaaS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loginSecurityConcerns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login Security Concerns</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Brute-force attacks, bot registrations" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Suggestions...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Get Captcha Reminder
                  </>
                )}
              </Button>
            </form>
          </Form>

          {result && (
            <Card className="mt-8 bg-secondary">
              <CardHeader>
                <CardTitle className="text-xl text-secondary-foreground">AI Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-foreground">Suggested Captcha Provider:</h4>
                  <p className="text-sm text-secondary-foreground/80 p-3 bg-background rounded-md mt-1">{result.captchaProviderSuggestion}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-foreground">Reminder:</h4>
                  <p className="text-sm text-secondary-foreground/80 p-3 bg-background rounded-md mt-1">{result.reminderMessage}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}