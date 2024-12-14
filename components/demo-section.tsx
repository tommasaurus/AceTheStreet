"use client";

import { Play } from 'lucide-react';
import { AnimatedText } from './animated-text';
import { Button } from './ui/button';

export function DemoSection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video Preview */}
          <div className="relative aspect-video bg-blue-900/5 rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 p-0 group-hover:scale-110 transition-transform duration-300"
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
            {/* Placeholder for video thumbnail */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: 'url("/city-backdrop.jpg")'
              }}
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <AnimatedText 
              text="See how it works"
              className="text-sm font-semibold text-blue-500 uppercase tracking-wider"
            />
            <AnimatedText 
              text="Master Investment Banking Interviews with Real Questions"
              className="text-3xl md:text-4xl font-bold text-blue-900"
            />
            <AnimatedText 
              text="Watch our platform in action and discover how we can help you succeed in your investment banking interviews."
              className="text-lg text-blue-600/80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}