import { TestSettings } from "./TestSetup";
import type { Question } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const ConfigureTest = ({
  onStartTest,
  questions,
}: {
  onStartTest: (settings: TestSettings) => void;
  questions: Question[];
}) => {
  const handleStartTest = () => {
    const settings: TestSettings = {
      questionCount: Math.min(10, questions.length),
      timeLimit: 15,
      questionTypes: {
        trueFalse: true,
        multipleChoice: true,
        matching: true,
      },
    };
    onStartTest(settings);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      {/* ... other configuration elements ... */}

      {/* Start Test Button */}
      <motion.button
        onClick={handleStartTest}
        className={cn(
          "group relative w-full max-w-[280px] h-[52px]",
          "bg-gray-900/90 dark:bg-white/90",
          "backdrop-blur-sm",
          "rounded-xl",
          "border border-gray-800/50 dark:border-white/20",
          "transition-all duration-300 ease-out",
          "hover:bg-gray-900/95 dark:hover:bg-white/95",
          "hover:-translate-y-0.5",
          "hover:shadow-lg hover:shadow-gray-950/20 dark:hover:shadow-white/20",
          "active:translate-y-0",
          "focus:outline-none focus:ring-2 focus:ring-gray-800/30 dark:focus:ring-green-500/30",
          "focus:ring-offset-2 dark:focus:ring-offset-[#151e2a]"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Content wrapper */}
        <div className="relative flex items-center justify-center gap-3">
          {/* Text with subtle gradient */}
          <span
            className={cn(
              "text-[15px] font-medium",
              "text-white dark:text-gray-900"
            )}
          >
            Configure Test
          </span>

          {/* Minimal arrow */}
          <motion.div
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-4 h-4 text-white/70 dark:text-gray-900/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12h16" />
              <path d="m15 5 7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.button>

      {/* Back Button */}
      <motion.button
        onClick={handleBack}
        className={cn(
          "group relative px-6 py-2",
          "bg-transparent",
          "rounded-lg",
          "transition-all duration-300",
          "hover:-translate-y-0.5",
          "text-gray-600 dark:text-gray-400",
          "hover:text-gray-900 dark:hover:text-gray-200"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </div>
      </motion.button>
    </div>
  );
};
