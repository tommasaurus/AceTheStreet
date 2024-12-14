"use client";

import { CheckCircle2, Clock, Database, Trophy } from "lucide-react";
import { AnimatedText } from "./animated-text";

const features = [
  {
    icon: Clock,
    title: "Latest IB Questions",
    description:
      "Access technical questions from the current investment banking recruiting cycle",
  },
  {
    icon: Database,
    title: "Comprehensive Coverage",
    description:
      "Extensive database of technical questions from bulge bracket and elite boutique banks",
  },
  {
    icon: CheckCircle2,
    title: "Expert-Verified Solutions",
    description:
      "Detailed solutions verified by investment banking professionals",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description: "Join candidates who secured offers at top investment banks",
  },
];

export function WhyUsSection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Left-aligned content */}
        <div className="max-w-3xl mb-16">
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <feature.icon className="h-6 w-6 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <AnimatedText
                    text={feature.title}
                    className="text-xl font-semibold text-blue-900 dark:text-white mb-2"
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
