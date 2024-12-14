"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      >
        <source src="/videos/FrontPageVideo.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">The fastest way to </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#ffd4d4] to-[#ccd9ff]">
              master IB interviews
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 mb-8">
            Prepare with real technical questions from top bulge bracket and
            elite boutique banks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-blue-400 hover:bg-blue-500 text-white"
              asChild
            >
              <Link href="/signup">Try for free</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-pink-100/10 hover:bg-pink-100/20 text-white"
              asChild
            >
              <Link href="#learn-more">Learn more</Link>
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
