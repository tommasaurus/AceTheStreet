"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#151e2a] p-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* Logo and Title */}
        <div className='text-center'>
          <Link
            href='/'
            className='text-2xl font-bold text-black dark:text-white'
          >
            PrepIB
          </Link>
          <h2 className='mt-6 text-3xl font-bold text-black dark:text-white'>
            Create your account
          </h2>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Start preparing for your dream role
          </p>
        </div>

        <div className='space-y-6'>
          {/* Google Sign In */}
          <Button
            className='w-full bg-white hover:bg-gray-100 text-black border border-gray-300 dark:border-gray-700 dark:bg-[#1c2936] dark:hover:bg-[#2a3744] dark:text-white h-12 rounded-full flex items-center justify-center gap-2'
            asChild
          >
            <Link href='/api/auth/google' className='flex items-center gap-2'>
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  fill='#4285F4'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#FBBC05'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                />
              </svg>
              Continue with Google
            </Link>
          </Button>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-200 dark:border-gray-800' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white dark:bg-[#151e2a] px-2 text-gray-500 dark:text-gray-400'>
                or continue with email
              </span>
            </div>
          </div>

          {/* Email Sign Up Form */}
          <form className='space-y-6'>
            <div>
              <Input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='h-12 bg-[#ECECEC] dark:bg-[#1c2936] border-0 rounded-xl text-black dark:text-white placeholder:text-gray-500'
              />
            </div>

            <div>
              <Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='h-12 bg-[#ECECEC] dark:bg-[#1c2936] border-0 rounded-xl text-black dark:text-white placeholder:text-gray-500'
              />
            </div>

            <div className='relative'>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='h-12 bg-[#ECECEC] dark:bg-[#1c2936] border-0 rounded-xl text-black dark:text-white placeholder:text-gray-500'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <Button className='w-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-[#151e2a] dark:hover:bg-white/90 h-12 rounded-full'>
              Sign up
            </Button>
          </form>

          {/* Links */}
          <div className='space-y-4 text-center text-sm'>
            <p className='text-gray-500 dark:text-gray-400'>
              By signing up, you accept our{" "}
              <Link
                href='/terms'
                className='text-black dark:text-white hover:underline'
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href='/privacy'
                className='text-black dark:text-white hover:underline'
              >
                Privacy Policy
              </Link>
            </p>
            <p className='text-gray-500 dark:text-gray-400'>
              Already have an account?{" "}
              <Link
                href='/signin'
                className='text-black dark:text-white hover:underline'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
