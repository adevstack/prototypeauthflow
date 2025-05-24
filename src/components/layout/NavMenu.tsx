
// For prototype purposes, login state is managed via localStorage.
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { ThemeToggle } from '@/components/ThemeToggle'; // Import ThemeToggle

const navItemsDefinition = [
  { href: '/', label: 'Home', id: 'home' },
  { href: '/dashboard', label: 'Dashboard', id: 'dashboard' },
  { href: '/login', label: 'Login', id: 'login' },
  { href: '/register', label: 'Sign Up', id: 'register' },
];

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize router
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const loggedInStatus = localStorage.getItem('isLoggedInDemo');
      if (loggedInStatus === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [pathname]); // Re-check on pathname change to reflect status if user navigates manually

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedInDemo');
      localStorage.removeItem('mfaEnabledDemo'); // Also clear MFA demo status on logout
    }
    setIsLoggedIn(false);
    router.push('/login'); // Redirect to login page
  };

  return (
    <nav className="flex items-center gap-2">
      {navItemsDefinition.map((item) => {
        // Condition to hide Login/Register if loggedIn
        if ((item.href === '/login' || item.href === '/register') && isLoggedIn && mounted) {
          return null;
        }

        // Condition to hide Dashboard link if not loggedIn AND not on the dashboard page itself
        if (item.href === '/dashboard' && !isLoggedIn && pathname !== '/dashboard' && mounted) {
          return null;
        }
        
        return (
          <Button
            key={item.id}
            variant="ghost"
            asChild
            className={cn(mounted && pathname === item.href && "bg-accent text-accent-foreground")}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        );
      })}
      {/* Conditional rendering for Logout button */}
      {isLoggedIn && mounted && (
         <Button variant="outline" onClick={handleLogout}>Logout</Button>
      )}
      <ThemeToggle /> 
    </nav>
  );
}
