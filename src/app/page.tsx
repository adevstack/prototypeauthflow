
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, CheckSquare, LogIn, UserPlus, ShieldQuestion, Shield, LayoutGrid, Workflow } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; 
import React from "react";

const features = [
  {
    title: "User Login",
    description: "Access your account securely with email/password or social sign-in.",
    href: "/login",
    icon: <LogIn className="h-6 w-6 text-primary" />,
  },
  {
    title: "Create Account",
    description: "Join our platform in a few easy steps via email or social providers.",
    href: "/register",
    icon: <UserPlus className="h-6 w-6 text-primary" />,
  },
  {
    title: "MFA Setup",
    description: "Enhance account security with Multi-Factor Authentication.",
    href: "/mfa-setup",
    icon: <CheckSquare className="h-6 w-6 text-primary" />,
  },
  {
    title: "Captcha Reminder",
    description: "AI-powered advice on implementing Captcha for your application.",
    href: "/captcha-reminder",
    icon: <ShieldQuestion className="h-6 w-6 text-primary" />,
  },
];

const whyAuthFlowItems = [
  {
    icon: <Shield className="h-10 w-10 text-primary mb-4" />,
    title: "Robust Security Concepts",
    description: "Built with security best practices in mind, simulating MFA, phishing detection, and secure password handling concepts to protect user accounts.",
  },
  {
    icon: <LayoutGrid className="h-10 w-10 text-primary mb-4" />,
    title: "Modern & Intuitive UI",
    description: "A clean, responsive user interface built with Next.js, Tailwind CSS, and ShadCN UI components for a seamless and pleasant user experience.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 text-center bg-gradient-to-b from-background via-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl">
              Prototype for Orizn
            </h1>
          </div>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
            A comprehensive prototype demonstrating modern authentication flows.
            Secure, intuitive, and ready to explore.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="#features">Explore Our Features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12 text-primary">
            Key Authentication Flows
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:max-w-6xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card text-card-foreground rounded-lg overflow-hidden">
                <CardHeader className="items-center pt-6">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center flex-grow px-6 pb-6">
                  <p className="text-sm text-muted-foreground h-20 mb-4">
                    {feature.description}
                  </p>
                  <Button asChild variant="outline" className="mt-auto w-full border-primary text-primary hover:bg-primary/10">
                    <Link href={feature.href}>
                      Try It Out <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-authflow" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12 text-primary">
            Why Choose This Prototype?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:max-w-6xl mx-auto">
            {whyAuthFlowItems.map((item) => (
              <Card key={item.title} className="bg-card text-card-foreground p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Flowchart Section */}
      <section className="py-16 text-center bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary">Technical Flowchart</h2>
          <p className="mt-4 max-w-xl mx-auto text-md text-foreground/70 mb-6">
            See the authentication process visually. Click the button below to view the detailed flowchart.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Workflow className="mr-2 h-5 w-5" /> View Authentication Flowchart
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary">Authentication Process Flowchart</DialogTitle>
              </DialogHeader>
              <div className="flex-grow overflow-auto p-4">
                <Image
                  src="https://drive.google.com/uc?export=view&id=1Uyq6HVIchtaFHaS5-M0PMZbYwr-ZydrZ" 
                  alt="Authentication Process Flowchart"
                  width={1080} 
                  height={1546} 
                  className="mx-auto rounded-md shadow-lg"
                  data-ai-hint="flowchart authentication"
                  priority={false} 
                  loading="lazy" 
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
