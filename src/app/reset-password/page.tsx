
"use client"; // Keep this at the top for the main page component if it still has client-side interactions or imports client components directly.

import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, KeyRound, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import React, { Suspense } from "react"; // Import Suspense
import { passwordRequirements } from "@/schemas/authSchemas";

// Define schema and type inside or outside, but it's used by ResetPasswordFormFields
const ResetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." })
    .regex(passwordRequirements.find(r => r.message.includes("lowercase"))!.regex, { message: passwordRequirements.find(r => r.message.includes("lowercase"))!.message })
    .regex(passwordRequirements.find(r => r.message.includes("uppercase"))!.regex, { message: passwordRequirements.find(r => r.message.includes("uppercase"))!.message })
    .regex(passwordRequirements.find(r => r.message.includes("number"))!.regex, { message: passwordRequirements.find(r => r.message.includes("number"))!.message })
    .regex(passwordRequirements.find(r => r.message.includes("special character"))!.regex, { message: passwordRequirements.find(r => r.message.includes("special character"))!.message }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});
type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

// New client component containing the form and useSearchParams logic
function ResetPasswordFormFields() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const currentPassword = useWatch({ control: form.control, name: "newPassword" });

  React.useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid Reset Link",
        description: "The password reset link is invalid or has expired.",
        variant: "destructive",
      });
      router.push("/forgot-password");
    }
  }, [token, router, toast]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    console.log("Reset password data:", data, "Token:", token);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Password Reset Successful (Simulated)",
      description: "Your password has been updated. You can now sign in with your new password.",
    });
    setIsLoading(false);
    router.push("/login");
  };

  if (!token && !isLoading) { // Added !isLoading to prevent brief flash of this card if token check is async
    return (
       <AuthCard
        title="Invalid Link"
        description="This password reset link is not valid or has expired."
        footerLinkHref="/login"
        footerLinkText="Back to Login"
      >
        <p className="text-center text-muted-foreground">Please request a new password reset link if needed.</p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset Your Password"
      description="Enter your new password below."
      footerLinkHref="/login"
      footerLinkText="Back to Sign In"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type="password" placeholder="Enter new password" {...field} className="pl-10" disabled={isLoading}/>
                  </FormControl>
                </div>
                <FormMessage />
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {passwordRequirements.map(req => {
                    const isValid = currentPassword && req.regex.test(currentPassword);
                    return (
                      <div key={req.message} className={`flex items-center ${currentPassword ? (isValid ? 'text-green-600' : 'text-destructive') : ''}`}>
                        {currentPassword ? (isValid ? <CheckCircle className="h-3 w-3 mr-1.5" /> : <XCircle className="h-3 w-3 mr-1.5" />) : <Lock className="h-3 w-3 mr-1.5 opacity-50" />}
                        {req.message}
                      </div>
                    );
                  })}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type="password" placeholder="Confirm new password" {...field} className="pl-10" disabled={isLoading} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <KeyRound />}
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}

// Main page component
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen w-full">
                          <Loader2 className="h-12 w-12 animate-spin text-primary" />
                          <p className="ml-4 text-lg">Loading reset options...</p>
                        </div>}>
      <ResetPasswordFormFields />
    </Suspense>
  );
}
