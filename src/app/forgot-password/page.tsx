
"use client";

import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ForgotPasswordFormData, ForgotPasswordSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { checkEmailForPhishing } from "@/lib/actions";
import React from "react";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    console.log("Forgot password data:", data);
    
    try {
      // Simulate API delay for phishing check
      await new Promise(resolve => setTimeout(resolve, 1500));
      const phishingResult = await checkEmailForPhishing(data.email);
      
      if (phishingResult.isPhishingLikely) {
        toast({
          title: "Potential Phishing Attempt",
          description: `The email address ${data.email} is flagged as potentially suspicious. Reason: ${phishingResult.reason}. For security, password reset is disabled for this email.`,
          variant: "destructive",
          duration: 9000,
        });
      } else {
        toast({
          title: "Password Reset (Simulated)",
          description: `If an account exists for ${data.email}, a password reset link has been sent (simulated). Phishing check passed: ${phishingResult.reason || 'No issues found.'}`,
          duration: 7000,
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Forgot Your Password?"
      description="Enter your email address and we'll send you a link to reset your password (simulated)."
      footerLinkHref="/login"
      footerLinkText="Back to Sign In"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} className="pl-10" disabled={isLoading}/>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            {isLoading ? "Processing..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
