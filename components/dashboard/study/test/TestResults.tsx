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

      <Button onClick={onRestart} className={styles.startNewTestButton}>
        Start New Test
      </Button>
    </div>
  );
}
