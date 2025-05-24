
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-card text-card-foreground print:hidden">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} Prototype for Orizn. All rights reserved.</p>
      </div>
    </footer>
  );
}
