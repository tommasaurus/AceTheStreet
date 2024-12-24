"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2, BookText } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const sections = [
  {
    id: "m&i400",
    title: "M&I 400",
    description:
      "The complete Mergers & Inquisitions 400 interview questions with detailed answers.",
    href: "/study/m&i400",
    count: "400 Questions",
    icon: BookText,
  },
  {
    id: "banks",
    title: "Bank Questions",
    description:
      "Bank-specific interview questions from top investment banks. Organized by institution.",
    href: "/study/banks",
    count: "200+ Questions",
    icon: Building2,
  },
  {
    id: "problems",
    title: "Technical Problems",
    description:
      "Practice with real technical interview problems. Each problem comes with a detailed solution and explanation.",
    href: "/study/problems",
    count: "50+ Problems",
    icon: TrendingUp,
  },
];

export default function StudyPage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative min-h-screen w-full animate-pulse">
        <div className="relative max-w-6xl mx-auto space-y-12 px-4 sm:px-6 pt-8">
          <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[320px] bg-gray-200 dark:bg-gray-800 rounded-3xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="relative min-h-screen w-full">
      <div className="relative max-w-6xl mx-auto space-y-12 px-4 sm:px-6 pt-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-black dark:text-white">
            Study Materials
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ace your investment banking interviews with our comprehensive
            question bank and practice problems.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + index * 0.1,
                }}
              >
                <Link href={section.href} className="block">
                  <Card className="relative h-[320px] rounded-3xl border-0 bg-[#ECECEC] dark:bg-[#1c2936] p-8">
                    <CardHeader className="p-0 h-full">
                      <div className="flex h-full flex-col justify-between">
                        <div className="space-y-6">
                          <div className="w-12 h-12 rounded-xl bg-[#E0E0E0] dark:bg-[#2a3744] flex items-center justify-center">
                            <Icon className="w-6 h-6 text-black dark:text-white" />
                          </div>
                          <div className="space-y-3">
                            <CardTitle className="text-2xl font-medium text-black dark:text-white">
                              {section.title}
                            </CardTitle>
                            <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed">
                              {section.description}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant="secondary"
                          className="w-fit text-sm py-1.5 px-4 rounded-full bg-[#E0E0E0] dark:bg-[#2a3744] text-gray-600 dark:text-gray-300"
                        >
                          {section.count}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
