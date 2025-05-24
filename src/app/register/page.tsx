
"use client";

import AuthCard from "@/components/auth/AuthCard";
import SocialSignInButtons from "@/components/auth/SocialSignInButtons";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RegisterFormData, RegisterSchema, passwordRequirements } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, UserPlusIcon, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useWatch } from "react-hook-form";

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur", // Validate on blur to show password requirements feedback
  });

  const currentPassword = useWatch({ control: form.control, name: "password" });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    console.log("Register data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    toast({
      title: "Registration Submitted (Simulated)",
      description: `Account created for ${data.email}. Please check your email for verification (simulated).`,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedInDemo', 'true');
    }
    
    setIsLoading(false);
    router.push("/mfa-setup");
  };

  return (
    <AuthCard
      title="Create an Account"
      description="Get started with Prototype for Orizn by creating your account."
      footerLinkHref="/login"
      footerLinkText="Sign in to your account"
      footerText="Already have an account?"
    >
      <SocialSignInButtons isRegister={true} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} className="pl-10" disabled={isLoading} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type="password" placeholder="Create a strong password" {...field} className="pl-10" disabled={isLoading} />
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
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type="password" placeholder="Re-enter your password" {...field} className="pl-10" disabled={isLoading} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <UserPlusIcon />}
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
