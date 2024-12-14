"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className='min-h-screen px-4 py-20 bg-white dark:bg-[#151e2a]'>
      <div className='mx-auto max-w-[1400px] rounded-[32px] overflow-hidden relative min-h-[85vh] flex items-center'>
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className='absolute inset-0 w-full h-full object-cover blur-[4px] opacity-75 dark:opacity-90'
        >
          <source src='/videos/FrontPageVideo.mp4' type='video/mp4' />
        </video>

        {/* Gradient Overlay - Only in Dark Mode */}
        <div className='absolute inset-0 bg-none dark:bg-gradient-to-r dark:from-[#151e2a]/30 dark:via-[#151e2a]/20 dark:to-transparent' />

        {/* Content */}
        <div className='relative z-10 px-8 md:px-16 max-w-3xl'>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 text-black dark:text-white'>
            The fastest way to{" "}
            <span className='text-black dark:text-white'>
              master IB interviews
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-black/80 mb-8 dark:text-white/80'>
            Prepare with real technical questions from top bulge bracket and
            elite boutique banks.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button
              size='lg'
              className='bg-black hover:bg-black/90 text-white font-medium w-full sm:w-auto justify-center rounded-full dark:bg-white dark:text-[#151e2a] dark:hover:bg-white/90'
              asChild
            >
              <Link href='/signup' className='flex items-center gap-2'>
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
                Sign in with Google
              </Link>
            </Button>
            <Button
              size='lg'
              className='bg-black/20 backdrop-blur-sm hover:bg-black/30 text-black border-2 border-black w-full sm:w-auto justify-center rounded-full dark:bg-white/20 dark:backdrop-blur-md dark:hover:bg-white/30 dark:text-white dark:border-white'
              asChild
            >
              <Link href='/signup'>Sign in with email</Link>
            </Button>
          </div>
          <p className='text-sm text-black/60 mt-4 dark:text-white/60'>
            No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
