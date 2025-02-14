"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function Footer() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) {
    return (
      <footer className='border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151e2a]'>
        <div className='container mx-auto px-4'>
          <div className='py-8'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-6 mb-8'>
              <div className='relative w-[130px] h-[42px]' />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className='border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        <div className='py-8'>
          {/* Top section with logo and buttons */}
          <div className='flex flex-col sm:flex-row justify-between items-center gap-6 mb-8'>
            {/* Logo */}
            <Link href='/' className='flex items-center'>
              <div className='relative w-[130px] h-[42px]'>
                <Image
                  src={
                    currentTheme === "dark"
                      ? "/images/logoLight.png"
                      : "/images/logoDark.png"
                  }
                  alt='AceTheStreet Logo'
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>

            {/* Action Buttons */}
            <div className='flex items-center gap-4'>
              <ThemeToggle />
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
                <Link href='/signup'>Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Bottom section with links and copyright */}
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
            {/* Copyright */}
            <div>© 2024 AceTheStreet. All rights reserved.</div>

            {/* Links */}
            <div className='flex flex-wrap items-center gap-6'>
              <button
                onClick={() => scrollToSection("features")}
                className='hover:text-gray-900 dark:hover:text-gray-200 transition-colors'
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className='hover:text-gray-900 dark:hover:text-gray-200 transition-colors'
              >
                Pricing
              </button>
              <Link
                href='/terms'
                className='hover:text-gray-900 dark:hover:text-gray-200 transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                href='/privacy'
                className='hover:text-gray-900 dark:hover:text-gray-200 transition-colors'
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
