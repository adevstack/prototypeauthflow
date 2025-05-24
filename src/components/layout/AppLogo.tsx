import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
      <ShieldCheck className="h-8 w-8" />
      <span className="text-2xl font-semibold">Prototype for Orizn</span>
    </Link>
  );
}
