"use client";

import { Button } from "@/components/ui/button";
import styles from "./test.module.css";
import { motion } from "framer-motion";

interface TestResultsProps {
  results: {
    total: number;
    correct: number;
    incorrect: number;
    skipped: number;
    score: number;
    answers: {
      question: string;
      userAnswer: string;
      correctAnswer: string;
    }[];
  };
  timeTaken: number;
  timeLimit: number;
  onRestart: () => void;
}

export function TestResults({
  results,
  timeTaken,
  timeLimit,
  onRestart,
}: TestResultsProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
        Test Results
      </h1>

      <div className="relative w-48 h-48 mb-12">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]" />
        <div className="absolute inset-[6px] rounded-full bg-background flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
              {results.score}%
            </span>
            <span className="block text-muted-foreground mt-1">Score</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-12 w-full max-w-2xl">
        <div className="bg-card p-4 rounded-xl text-center">
          <span className="block text-3xl font-bold text-[#22c55e]">
            {results.correct}
          </span>
          <span className="text-sm text-muted-foreground">Correct</span>
        </div>
        <div className="bg-card p-4 rounded-xl text-center">
          <span className="block text-3xl font-bold text-[#22c55e]">
            {results.incorrect}
          </span>
          <span className="text-sm text-muted-foreground">Incorrect</span>
        </div>
        <div className="bg-card p-4 rounded-xl text-center">
          <span className="block text-3xl font-bold text-[#22c55e]">
            {results.skipped}
          </span>
          <span className="text-sm text-muted-foreground">Skipped</span>
        </div>
        <div className="bg-card p-4 rounded-xl text-center">
          <span className="block text-3xl font-bold text-[#22c55e]">
            {Math.floor(timeTaken / 60)}:
            {(timeTaken % 60).toString().padStart(2, "0")}
          </span>
          <span className="text-sm text-muted-foreground">Time Taken</span>
        </div>
      </div>

      <Button
        onClick={onRestart}
        className="relative w-[400px] h-12 group overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#4ade80] opacity-100" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e]/40 to-[#4ade80]/40 blur-md group-hover:opacity-75 transition-opacity" />

        <div className="relative flex items-center justify-center w-full px-8 py-4 bg-white/95 dark:bg-[#151e2a]/95 backdrop-blur-sm rounded-xl">
          <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
            Start New Test
          </span>
        </div>

        <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#22c55e] via-transparent to-[#4ade80]" />
        <div className="absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-[#22c55e] via-transparent to-[#4ade80]" />
      </Button>
    </div>
  );
}
