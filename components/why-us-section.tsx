"use client";

import { CheckCircle2, Clock, Database, Trophy } from 'lucide-react';
import { AnimatedText } from './animated-text';

const features = [
  {
    icon: Clock,
    title: "Latest Questions",
    description: "Access questions from the current recruiting cycle, updated in real-time"
  },
  {
    icon: Database,
    title: "Comprehensive Database",
    description: "Thousands of real questions from top investment banks and PE firms"
  },
  {
    icon: CheckCircle2,
    title: "Verified Answers",
    description: "Expert-verified answers from successful candidates and professionals"
  },
  {
    icon: Trophy,
    title: "Proven Success",
    description: "Join thousands of candidates who secured offers at top firms"
  }
];

export function WhyUsSection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <AnimatedText 
            text="Why Choose Us"
            className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4"
          />
          <AnimatedText 
            text="The Most Up-to-Date Interview Preparation Platform"
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
          />
          <AnimatedText 
            text="Stay ahead with real questions from the latest recruiting cycle"
            className="text-lg text-blue-600/80"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <feature.icon className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <AnimatedText 
                    text={feature.title}
                    className="text-xl font-semibold text-blue-900 mb-2"
                  />
                  <AnimatedText 
                    text={feature.description}
                    className="text-blue-600/80"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}