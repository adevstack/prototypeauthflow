import type React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerLinkHref: string;
  footerLinkText: string;
  footerText?: string;
}

export default function AuthCard({ title, description, children, footerLinkHref, footerLinkText, footerText }: AuthCardProps) {
  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">{title}</CardTitle>
          <CardDescription className="text-md pt-1">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center text-sm">
          {footerText && <p className="mb-1">{footerText}</p>}
          <Link href={footerLinkHref} className="font-medium text-primary hover:underline">
            {footerLinkText}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}