
"use client";

import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Copy, ShieldCheck, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const backupCodes = [
  "H4P2-L9XV-K8JQ",
  "R7G1-N5YC-B3FM",
  "T2K9-Z6WD-P4VQ",
  "M6F3-X1CS-J8LY",
  "Q9V7-E4BH-A2WU",
];

export default function MfaSetupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [mfaEnabled, setMfaEnabled] = React.useState(false);
  const [copiedStates, setCopiedStates] = React.useState<Record<string, boolean>>({});


  const handleEnableMfa = () => {
    // Simulate enabling MFA
    setMfaEnabled(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mfaEnabledDemo', 'true');
    }
    toast({
      title: "MFA Enabled (Simulated)",
      description: "Multi-Factor Authentication has been successfully set up for your account.",
    });
  };

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedStates(prev => ({ ...prev, [code]: true }));
      toast({
        title: "Copied!",
        description: `Backup code ${code} copied to clipboard.`,
      });
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [code]: false }));
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-primary flex items-center justify-center gap-2">
            <ShieldCheck className="h-8 w-8" /> Multi-Factor Authentication
          </CardTitle>
          <CardDescription className="text-md pt-1">
            {mfaEnabled 
              ? "MFA is now active. Store your backup codes securely." 
              : "Enhance account security with MFA using an authenticator app."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!mfaEnabled ? (
            <>
              <p className="text-sm text-center text-muted-foreground">
                To set up MFA, scan a QR code (not shown in this prototype) with an authenticator app like Google Authenticator or Authy.
              </p>
              <p className="text-sm text-center text-muted-foreground mt-2">
                If you encounter issues or have questions during setup with your authenticator app, you can scan the QR code below to contact our support team via email.
              </p>
              <div className="flex flex-col items-center my-4">
                <Image
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=mailto%3Aafrozaman123%40gmail.com%3Fsubject%3DMFA%20Setup%20Support"
                  alt="QR Code to email support"
                  width={180}
                  height={180}
                  data-ai-hint="qr email support"
                  className="rounded-lg border"
                />
                <span className="text-xs text-muted-foreground mt-1">Contact Support (QR)</span>
              </div>
              
              <Button onClick={handleEnableMfa} className="w-full">
                I've configured my app, Enable MFA & Continue
              </Button>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">MFA Successfully Enabled!</h3>
              <p className="mt-2 text-muted-foreground">
                Save these backup codes in a safe place. Use them if you lose access to your authenticator app.
              </p>
              <div className="mt-6 space-y-2 bg-secondary p-4 rounded-md">
                <h4 className="font-medium text-secondary-foreground">Your Backup Codes:</h4>
                {backupCodes.map((code) => (
                  <div key={code} className="flex items-center justify-between p-2 bg-background rounded hover:bg-muted transition-colors">
                    <span className="font-mono text-sm">{code}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyCode(code)} className="w-20">
                      {copiedStates[code] ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 mr-1" />}
                      {copiedStates[code] ? "Copied" : "Copy"}
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={() => router.push("/dashboard")} className="w-full mt-8">
                Go to Dashboard
              </Button>
            </div>
          )}
           <div className="mt-6 text-center border-t pt-4">
              <Button variant="link" asChild>
                <a href="https://support.google.com/accounts/answer/1066447?hl=en" target="_blank" rel="noopener noreferrer" className="text-sm">
                  <HelpCircle className="mr-2 h-4 w-4" /> Learn more about MFA
                </a>
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
