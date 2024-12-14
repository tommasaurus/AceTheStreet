"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2942]/90 to-[#1a2942]/70">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/city-backdrop.jpg")',
            backgroundBlendMode: 'overlay'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            The fastest way to ace your finance interviews
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 mb-8">
            Prepare with real questions from top investment banks, private equity, and consulting firms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-blue-400 hover:bg-blue-500 text-white"
              asChild
            >
              <Link href="/signup">
                Try for free
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-pink-100/10 hover:bg-pink-100/20 text-white"
              asChild
            >
              <Link href="#learn-more">
                Learn more
              </Link>
            </Button>
          </div>
          <p className="text-sm text-blue-200/80 mt-4">
            No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}