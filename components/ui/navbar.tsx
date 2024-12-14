"use client";

import { Building2, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold text-xl">PrepIB</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition">
            Pricing
          </Link>
          <Link href="#about" className="text-muted-foreground hover:text-foreground transition">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Try for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}