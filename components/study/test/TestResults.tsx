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
    <div className={styles.resultsContainer}>
      <h1 className={styles.resultsTitle}>Test Results</h1>

      <div className={styles.scoreCard}>
        <motion.div
          className={styles.scoreCircle}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className={styles.scoreNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(results.score)}%
          </motion.div>
          <div className={styles.scoreLabel}>Score</div>
        </motion.div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{results.correct}</div>
          <div className={styles.statLabel}>Correct</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{results.incorrect}</div>
          <div className={styles.statLabel}>Incorrect</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{results.skipped}</div>
          <div className={styles.statLabel}>Skipped</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {Math.floor(timeTaken / 60)}:
            {(timeTaken % 60).toString().padStart(2, "0")}
          </div>
          <div className={styles.statLabel}>Time Taken</div>
        </div>
      </div>

      <Button onClick={onRestart} className={styles.restartButton}>
        Start New Test
      </Button>
    </div>
  );
}
