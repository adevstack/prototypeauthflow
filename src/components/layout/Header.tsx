import Link from 'next/link';
import AppLogo from './AppLogo';
import { Button } from '@/components/ui/button';
import NavMenu from './NavMenu';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <AppLogo />
        <NavMenu />
      </div>
    </header>
  );
}
