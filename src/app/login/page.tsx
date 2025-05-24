
"use client";

import AuthCard from "@/components/auth/AuthCard";
import SocialSignInButtons from "@/components/auth/SocialSignInButtons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoginFormData, LoginSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React from "react";

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberDevice: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log("Login data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

    toast({
      title: "Login Submitted (Simulated)",
      description: `Email: ${data.email}, Remember: ${data.rememberDevice}`,
    });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedInDemo', 'true');
    }

    setIsLoading(false);
    // Simulate MFA check or direct login
    if (data.email.includes("mfa")) {
      router.push("/mfa-challenge");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <AuthCard
      title="Welcome Back!"
      description="Sign in to access your Prototype for Orizn account."
      footerLinkHref="/register"
      footerLinkText="Create a new account"
      footerText="Don't have an account?"
    >
      <SocialSignInButtons />
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
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <Link href="/forgot-password" passHref>
                    <Button variant="link" size="sm" className="p-0 h-auto text-sm text-primary" tabIndex={isLoading ? -1 : 0}>Forgot password?</Button>
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="pl-10" disabled={isLoading} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberDevice"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Remember this device
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
