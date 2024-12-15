"use client";

import { useEffect, useState } from "react";
import styles from "./test.module.css";

interface TimerProps {
  timeRemaining: number;
  isComplete: boolean;
}

export function Timer({ timeRemaining, isComplete }: TimerProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.timer}>
      <div className={styles.timeDisplay}>
        {isComplete ? "Time's up!" : formatTime(timeRemaining)}
      </div>
      <div
        className={styles.timeProgress}
        style={
          {
            "--progress": `${(timeRemaining / (60 * 60)) * 100}%`,
          } as any
        }
      />
    </div>
  );
}
