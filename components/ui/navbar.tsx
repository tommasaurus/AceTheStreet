"use client";

import Link from "next/link";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-bold text-xl text-blue-900 dark:text-white"
          >
            PrepIB
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Try for free</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
