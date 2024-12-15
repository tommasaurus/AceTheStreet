"use client";

import Link from "next/link";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-[#151e2a]/80 border-b border-gray-200 dark:border-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            href='/'
            className='font-bold text-xl text-black dark:text-white'
          >
            PrepIB
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-6'>
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

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center space-x-4'>
            <ThemeToggle />
            <Button
              variant='ghost'
              size='icon'
              className='text-black dark:text-white'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-[#151e2a] border-b border-gray-200 dark:border-gray-800'>
            <div className='flex flex-col space-y-4 p-4'>
              <Link
                href='/features'
                className='text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href='/pricing'
                className='text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href='/signin'
                className='text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href='/signup'
                className='bg-black hover:bg-black/90 text-white dark:bg-white dark:text-[#151e2a] dark:hover:bg-white/90 px-4 py-2 rounded-lg text-center'
                onClick={() => setIsMenuOpen(false)}
              >
                Try for free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
