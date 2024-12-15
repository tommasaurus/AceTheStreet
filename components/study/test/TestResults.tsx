"use client";

import { Button } from "@/components/ui/button";
import styles from "./test.module.css";

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
        <div className={styles.scoreCircle}>
          <div className={styles.scoreNumber}>{Math.round(results.score)}%</div>
          <div className={styles.scoreLabel}>Score</div>
        </div>
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
