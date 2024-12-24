"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StudyHeader({
  title,
  current,
  total,
  onBack,
}: {
  title: string;
  current: number;
  total: number;
  onBack: () => void;
}) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerY = useTransform(scrollY, [0, 100], [0, -8]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const blur = useTransform(scrollY, [0, 100], [8, 12]);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 inset-x-0 z-30 flex justify-center px-4"
      style={{ y: headerY }}
    >
      <motion.div className="relative w-[800px] mx-auto" style={{ scale }}>
        <motion.div
          className={cn(
            "relative overflow-hidden",
            "rounded-2xl",
            "border border-black/5 dark:border-white/10",
            "shadow-lg shadow-black/5",
            "bg-white/60 dark:bg-black/40"
          )}
          style={{
            backdropFilter: `blur(${blur}px)`,
          }}
        >
          {/* Enhanced gradient background */}
          <motion.div
            className="absolute inset-0 opacity-30 dark:opacity-50"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(147, 197, 253, 0.15), transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(167, 139, 250, 0.15), transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(147, 197, 253, 0.15), transparent 50%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Content container */}
          <div className="relative px-8 py-5">
            <div className="flex items-center gap-6">
              {/* Enhanced back button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className={cn(
                  "relative p-2.5 rounded-xl",
                  "bg-white/80 dark:bg-white/5",
                  "border border-black/5 dark:border-white/10",
                  "transition-all duration-300",
                  "group hover:shadow-md",
                  "overflow-hidden"
                )}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                  }}
                />

                {/* Icon with smooth animation */}
                <motion.div
                  className="relative"
                  animate={{ x: [-2, 0, -2] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.div>
              </motion.button>

              {/* Title section */}
              <div className="flex-1">
                <motion.h1
                  layout
                  className="text-2xl md:text-3xl font-semibold"
                >
                  <motion.span
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-violet-500 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ backgroundSize: "200% auto" }}
                  >
                    {title}
                  </motion.span>
                </motion.h1>
              </div>

              {/* Enhanced progress section */}
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                {/* Card counter with enhanced styling */}
                <motion.div
                  className={cn(
                    "px-4 py-2 rounded-xl",
                    "bg-white/80 dark:bg-white/5",
                    "border border-black/5 dark:border-white/10",
                    "relative overflow-hidden",
                    "shadow-sm"
                  )}
                >
                  {/* Subtle gradient animation */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: [0.5, 0.3, 0.5],
                      background: [
                        "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                        "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative text-base font-medium">
                    {current} of {total}
                  </span>
                </motion.div>

                {/* Enhanced progress bar */}
                <div className="relative w-28">
                  <div className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5" />
                  <motion.div
                    className="relative h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                    style={{
                      width: `${(current / total) * 100}%`,
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                        "0 0 8px 2px rgba(59, 130, 246, 0.3)",
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        background: [
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        ],
                        backgroundPosition: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
