"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import styles from "./test.module.css";
import { toast } from "sonner";

interface TestSetupProps {
  maxQuestions: number;
  onStartTest: (settings: TestSettings) => void;
}

export interface TestSettings {
  questionCount: number;
  timeLimit: number;
  questionTypes: {
    trueFalse: boolean;
    multipleChoice: boolean;
    matching: boolean;
  };
}

export function TestSetup({ maxQuestions, onStartTest }: TestSetupProps) {
  const [settings, setSettings] = useState<TestSettings>({
    questionCount: 20,
    timeLimit: 10,
    questionTypes: {
      trueFalse: false,
      multipleChoice: false,
      matching: false,
    },
  });
  const [error, setError] = useState<string | null>(null);

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setError(null);
    }, 500);
  };

  const handleQuestionCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSettings({
      ...settings,
      questionCount:
        value === "" ? 0 : Math.min(parseInt(value) || 0, maxQuestions),
    });
  };

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value === "" ? 0 : parseFloat(value);
    // Format number to always show leading zero
    const formattedValue = parsedValue === 0 ? "" : parsedValue.toString();
    setSettings({
      ...settings,
      timeLimit: parsedValue,
    });
  };

  const handleStartTest = () => {
    if (!Object.values(settings.questionTypes).some(Boolean)) {
      setError("questionTypes");
      toast.error("Please select at least one question type");
      return;
    }

    if (settings.questionCount === 0) {
      setError("questionCount");
      toast.error("Please enter the number of questions");
      return;
    }

    setError(null);
    onStartTest(settings);
  };

  return (
    <div className={styles.setupContainer}>
      <h1 className={styles.setupTitle}>Set up your test</h1>

      <div className={styles.setupForm}>
        <div
          className={`${styles.formGroup} ${
            error === "questionCount" ? styles.error : ""
          }`}
          onAnimationEnd={handleAnimationEnd}
        >
          <Label htmlFor="questionCount">Questions (max {maxQuestions})</Label>
          <Input
            id="questionCount"
            type="number"
            min={1}
            max={maxQuestions}
            value={settings.questionCount || ""}
            onChange={handleQuestionCountChange}
          />
        </div>

        <div
          className={`${styles.formGroup} ${
            error === "timeLimit" ? styles.error : ""
          }`}
          onAnimationEnd={handleAnimationEnd}
        >
          <Label htmlFor="timeLimit">
            Time limit (minutes, blank for no limit)
          </Label>
          <Input
            id="timeLimit"
            type="number"
            min={0}
            step="any"
            value={settings.timeLimit || ""}
            onChange={handleTimeLimitChange}
            onBlur={(e) => {
              // On blur, format decimal numbers to show leading zero
              const value = e.target.value;
              if (value.startsWith(".")) {
                e.target.value = `0${value}`;
                handleTimeLimitChange(e as any);
              }
            }}
          />
        </div>

        <div
          className={`${styles.questionTypes} ${
            error === "questionTypes" ? styles.error : ""
          }`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className={styles.switchGroup}>
            <Switch
              id="trueFalse"
              checked={settings.questionTypes.trueFalse}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  questionTypes: {
                    ...settings.questionTypes,
                    trueFalse: checked,
                  },
                })
              }
            />
            <Label htmlFor="trueFalse">True/False</Label>
          </div>

          <div className={styles.switchGroup}>
            <Switch
              id="multipleChoice"
              checked={settings.questionTypes.multipleChoice}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  questionTypes: {
                    ...settings.questionTypes,
                    multipleChoice: checked,
                  },
                })
              }
            />
            <Label htmlFor="multipleChoice">Multiple choice</Label>
          </div>

          <div className={styles.switchGroup}>
            <Switch
              id="matching"
              checked={settings.questionTypes.matching}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  questionTypes: {
                    ...settings.questionTypes,
                    matching: checked,
                  },
                })
              }
            />
            <Label htmlFor="matching">Matching</Label>
          </div>
        </div>

        <Button
          className={styles.startButton}
          onClick={handleStartTest}
          size="lg"
        >
          Start test
        </Button>
      </div>
    </div>
  );
}
