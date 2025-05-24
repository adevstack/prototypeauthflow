
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, ShieldCheck, UserCircle, LogOut, Settings, Home, Clock, ShieldOff, KeyRound } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Import useRouter

export default function DashboardPage() {
  const { toast } = useToast();
  const router = useRouter(); // Initialize router
  // In a real app, user data would come from auth context or session
  const user = {
    email: "user@example.com", // Placeholder
    username: "DemoUser123", // Placeholder
    joinedDate: "January 15, 2023", // Placeholder
  };

  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [lastLoginTime, setLastLoginTime] = useState<string | null>(null);
  const [mfaStatusForDisplay, setMfaStatusForDisplay] = useState(false); // Default to false

  useEffect(() => {
    // These will only run on the client, after initial hydration
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
    // Simulate last login slightly earlier than current time
    setLastLoginTime(new Date(now.getTime() - Math.random() * 1000000).toLocaleTimeString());

    // Check MFA status from localStorage
    if (typeof window !== 'undefined') {
      const mfaEnabledFromStorage = localStorage.getItem('mfaEnabledDemo');
      if (mfaEnabledFromStorage === 'true') {
        setMfaStatusForDisplay(true);
      } else {
        setMfaStatusForDisplay(false); // Default to false if not set or not 'true'
      }
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const handleDisableMfa = () => {
    setMfaStatusForDisplay(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mfaEnabledDemo', 'false');
    }
    toast({
      title: "MFA Disabled (Simulated)",
      description: "Multi-Factor Authentication has been disabled for your account.",
      variant: "destructive",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The Change Password functionality is not yet implemented in this prototype.",
    });
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedInDemo');
      localStorage.removeItem('mfaEnabledDemo'); // Also clear MFA demo status on logout
    }
    router.push('/login');
  };

  const simulatedActivities = [
    { id: 1, text: "Successful login from IP 192.168.1.100", icon: <Activity className="h-4 w-4 text-green-500" />, time: "2m ago" },
    { id: 2, text: "MFA code verified successfully", icon: <ShieldCheck className="h-4 w-4 text-blue-500" />, time: "1h ago" },
    { id: 3, text: "Profile information updated", icon: <UserCircle className="h-4 w-4 text-purple-500" />, time: "3h ago" },
  ];

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full shadow-xl overflow-hidden">
        <CardHeader className="bg-card border-b p-6">
          <div className="flex items-center space-x-4">
            <UserCircle className="h-16 w-16 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold tracking-tight text-primary">
                Welcome, {user.username}!
              </CardTitle>
              <CardDescription className="text-md pt-1">
                Here's an overview of your account and recent activity.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Profile & Security Card */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary" /> Profile & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Joined:</strong> {user.joinedDate}</p>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">MFA Status:</span>
                  <Badge variant={mfaStatusForDisplay ? "default" : "destructive"} className={mfaStatusForDisplay ? "bg-green-500 hover:bg-green-600" : ""}>
                    {mfaStatusForDisplay ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                 {lastLoginTime && (
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Clock className="mr-2 h-4 w-4" /> Last login (simulated): Today at {lastLoginTime}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex flex-wrap justify-start items-center gap-2">
                <Button asChild size="sm">
                  <Link href="/mfa-setup"><Settings className="mr-2 h-4 w-4" /> Manage MFA</Link>
                </Button>
                {mfaStatusForDisplay && (
                  <Button variant="outline" size="sm" onClick={handleDisableMfa}>
                    <ShieldOff className="mr-2 h-4 w-4" /> Disable MFA
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Recent Activity Card */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center"><Activity className="mr-2 h-5 w-5 text-primary" /> Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {simulatedActivities.map((activity) => (
                    <li key={activity.id} className="flex items-start text-sm">
                      <span className="mr-3 mt-1">{activity.icon}</span>
                      <div>
                        <span>{activity.text}</span>
                        <span className="block text-xs text-muted-foreground">{activity.time} (Simulated)</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <Link href="/"><Home className="mr-2 h-4 w-4" /> Go to Homepage</Link>
              </Button>
              <Button variant="outline" onClick={handleChangePassword}>
                <KeyRound className="mr-2 h-4 w-4" /> Change Password
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t p-6 bg-card">
          <Button variant="destructive" onClick={handleLogout} className="ml-auto">
            <LogOut className="mr-2 h-4 w-4" /> Log Out (Simulated)
          </Button>
        </CardFooter>
      </Card>
       {currentTime && (
        <p className="text-center text-xs text-muted-foreground mt-4">Current time (client-rendered): {currentTime}</p>
      )}
    </div>
  );
}
