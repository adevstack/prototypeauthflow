
"use client";

import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MfaChallengeFormData, MfaChallengeSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function MfaChallengePage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<MfaChallengeFormData>({
    resolver: zodResolver(MfaChallengeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: MfaChallengeFormData) => {
    console.log("MFA Code:", data.code);
    // Simulate MFA code verification
    // For prototype, any 6-digit code is accepted
    if (data.code === "123456" || data.code.length === 6) { // Example valid code or any 6 digits
      toast({
        title: "MFA Verification Successful (Simulated)",
        description: "You have successfully verified your identity.",
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedInDemo', 'true');
      }
      router.push("/dashboard");
    } else {
      toast({
        title: "MFA Verification Failed (Simulated)",
        description: "The MFA code is incorrect. Please try again.",
        variant: "destructive",
      });
      form.setError("code", { message: "Invalid MFA code." });
    }
  };

  return (
    <AuthCard
      title="MFA Challenge"
      description="Enter the code from your authenticator app to complete sign in."
      footerLinkHref="/login"
      footerLinkText="Try a different login method"
    >
      <div className="flex justify-center mb-6">
        <ShieldCheck className="h-16 w-16 text-primary" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Authentication Code</FormLabel>
                 <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input 
                      type="text" 
                      placeholder="Enter 6-digit code" 
                      {...field} 
                      className="pl-10 text-center tracking-[0.3em]"
                      maxLength={6}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Verify Code
          </Button>
        </form>
      </Form>
       <div className="mt-4 text-center">
        <Button variant="link" size="sm" className="text-primary" asChild>
          <Link href="/login">Need help? Contact support.</Link>
        </Button>
      </div>
    </AuthCard>
  );
}
