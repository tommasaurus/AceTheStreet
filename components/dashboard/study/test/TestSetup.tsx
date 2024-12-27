"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Atom,
  CheckCircle2,
  XCircle,
  Timer,
  Sparkles,
  Target,
  Lightbulb,
  Telescope,
  Shapes,
} from "lucide-react";
import styles from "./test.module.css";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TestSettings {
  questionCount: number;
  timeLimit: number;
  questionTypes: {
    trueFalse: boolean;
    multipleChoice: boolean;
  };
}

interface TestSetupProps {
  maxQuestions: number;
  onStartTest: (settings: TestSettings) => void;
}

export function TestSetup({ maxQuestions, onStartTest }: TestSetupProps) {
  const [settings, setSettings] = useState<TestSettings>({
    questionCount: Math.min(10, maxQuestions),
    timeLimit: 15,
    questionTypes: {
      trueFalse: true,
      multipleChoice: true,
    },
  });

  const handleStartTest = () => {
    onStartTest(settings);
  };

  const scrollToPreferences = () => {
    document.getElementById("testPreferences")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleCheckedChange = (
    field: keyof TestSettings["questionTypes"],
    checked: boolean | "indeterminate"
  ) => {
    setSettings({
      ...settings,
      questionTypes: {
        ...settings.questionTypes,
        [field]: checked === true,
      },
    });
  };

  return (
    <div className={styles.testSetupContainer}>
      <div className={styles.matchGameIntro}>
        <div className={styles.gameIcon}>
          <div className={styles.iconGrid}>
            <div className={styles.iconCard}>
              <Atom className="rotate-[15deg]" />
            </div>
            <div className={styles.iconCard}>
              <Target className="-rotate-[15deg]" />
            </div>
            <div className={styles.iconCard}>
              <Shapes />
            </div>
            <div className={styles.iconCard}>
              <Brain className="rotate-[10deg]" />
            </div>
            <div className={styles.iconCard}>
              <Telescope className="-rotate-[10deg]" />
            </div>
            <div className={styles.iconCard}>
              <Sparkles />
            </div>
          </div>
        </div>

        <div className={styles.introText}>
          <h1 className={styles.readyText}>Ready to test your knowledge?</h1>
          <p className={styles.gameDescription}>
            Customize your test settings below to begin the challenge
          </p>
        </div>

        <motion.button
          onClick={scrollToPreferences}
          className={cn(
            styles.configureButton,
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
            "focus:ring-offset-2 dark:focus:ring-offset-[#151e2a]",
            "mb-[1px]"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative flex items-center justify-center gap-3">
            <span className="text-[15px] font-medium text-white dark:text-gray-900">
              Configure Test
            </span>
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
      </div>

      <div id="testPreferences" className={styles.setupForm}>
        <div className={styles.optionsContainer}>
          <div className={styles.optionCard}>
            <h3 className={styles.optionTitle}>Number of Questions</h3>
            <Input
              type="number"
              min={1}
              max={maxQuestions}
              value={settings.questionCount === 0 ? "" : settings.questionCount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setSettings({ ...settings, questionCount: 0 });
                  return;
                }

                const numValue = parseInt(value);
                if (numValue <= maxQuestions) {
                  setSettings({
                    ...settings,
                    questionCount: numValue,
                  });
                }
              }}
              className={styles.numberInput}
            />
            <span className={styles.maxQuestions}>Maximum: {maxQuestions}</span>
          </div>

          <div className={styles.optionCard}>
            <h3 className={styles.optionTitle}>Time Limit (minutes)</h3>
            <Input
              type="number"
              min={0.1}
              max={120}
              step={0.1}
              value={settings.timeLimit === 0 ? "" : settings.timeLimit}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setSettings({ ...settings, timeLimit: 0 });
                  return;
                }

                const numValue = parseFloat(value);
                if (numValue <= 120) {
                  setSettings({
                    ...settings,
                    timeLimit: numValue,
                  });
                }
              }}
              className={styles.numberInput}
            />
            <span className={styles.maxQuestions}>Maximum: 120 minutes</span>
          </div>

          <div className={styles.optionCard}>
            <h3 className={styles.optionTitle}>Question Types</h3>
            <div className={styles.checkboxGroup}>
              <div className={styles.checkboxOption}>
                <Checkbox
                  checked={settings.questionTypes.trueFalse}
                  onCheckedChange={(checked) =>
                    handleCheckedChange("trueFalse", checked)
                  }
                  className="border-[#22c55e] data-[state=checked]:bg-[#22c55e] data-[state=checked]:text-white"
                />
                <label className={styles.checkboxLabel}>True/False</label>
              </div>
              <div className={styles.checkboxOption}>
                <Checkbox
                  checked={settings.questionTypes.multipleChoice}
                  onCheckedChange={(checked) =>
                    handleCheckedChange("multipleChoice", checked)
                  }
                  className="border-[#22c55e] data-[state=checked]:bg-[#22c55e] data-[state=checked]:text-white"
                />
                <label className={styles.checkboxLabel}>Multiple Choice</label>
              </div>
            </div>
          </div>

          <Button
            onClick={handleStartTest}
            className={cn(
              "group relative w-full max-w-[280px] h-[52px] mx-auto",
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
          >
            <div className="relative flex items-center justify-center gap-3">
              <span
                className={cn(
                  "text-[15px] font-medium",
                  "text-white dark:text-gray-900"
                )}
              >
                Start Test
              </span>
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
          </Button>
        </div>
      </div>
    </div>
  );
}
