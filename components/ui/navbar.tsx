"use client";

import Link from "next/link";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-transparent'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            href='/'
            className='font-bold text-xl text-black dark:text-white'
          >
            PrepIB
          </Link>

          {/* Right side navigation items */}
          <div className='flex items-center space-x-6'>
            <ThemeToggle />
            <Button
              variant='ghost'
              className='text-black/80 hover:text-black hover:bg-black/5 rounded-full dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10'
              asChild
            >
              <Link href='/features'>Features</Link>
            </Button>
            <Button
              variant='ghost'
              className='text-black/80 hover:text-black hover:bg-black/5 rounded-full dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10'
              asChild
            >
              <Link href='/pricing'>Pricing</Link>
            </Button>
            <Button
              variant='outline'
              className='text-black border-black bg-transparent hover:bg-black/5 rounded-full dark:text-white dark:border-white dark:hover:bg-white/10'
              asChild
            >
              <Link href='/signin'>Sign In</Link>
            </Button>
            <Button
              className='bg-black hover:bg-black/90 text-white rounded-full dark:bg-white dark:text-[#151e2a] dark:hover:bg-white/90'
              asChild
            >
              <Link href='/signup'>Try for free</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
