"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { GraduationCap, CheckCircle2, XCircle, Timer } from "lucide-react";
import styles from "./test.module.css";

export interface TestSettings {
  questionCount: number;
  questionTypes: {
    trueFalse: boolean;
    multipleChoice: boolean;
    matching: boolean;
  };
}

interface TestSetupProps {
  maxQuestions: number;
  onStartTest: (settings: TestSettings) => void;
}

export function TestSetup({ maxQuestions, onStartTest }: TestSetupProps) {
  const [settings, setSettings] = useState<TestSettings>({
    questionCount: 10,
    questionTypes: {
      trueFalse: true,
      multipleChoice: true,
      matching: true,
    },
  });

  const handleStartTest = () => {
    onStartTest(settings);
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
      <div className={styles.testIcon}>
        <div className={styles.iconGrid}>
          <div className={styles.iconCard}>
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className={styles.iconCard}>
            <XCircle className="w-8 h-8" />
          </div>
          <div className={styles.iconCard}>
            <Timer className="w-8 h-8" />
          </div>
          <div className={styles.iconCard}>
            <GraduationCap className="w-8 h-8" />
          </div>
        </div>
      </div>

      <h1 className={styles.readyText}>Ready to test your knowledge?</h1>

      <div className={styles.optionsContainer}>
        <div className={styles.optionCard}>
          <h3 className={styles.optionTitle}>Number of Questions</h3>
          <Input
            type="number"
            min={1}
            max={maxQuestions}
            value={settings.questionCount}
            onChange={(e) =>
              setSettings({
                ...settings,
                questionCount: parseInt(e.target.value) || 0,
              })
            }
            className={styles.numberInput}
          />
          <span className={styles.maxQuestions}>Maximum: {maxQuestions}</span>
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
                className={styles.checkbox}
              />
              <label className={styles.checkboxLabel}>True/False</label>
            </div>
            <div className={styles.checkboxOption}>
              <Checkbox
                checked={settings.questionTypes.multipleChoice}
                onCheckedChange={(checked) =>
                  handleCheckedChange("multipleChoice", checked)
                }
                className={styles.checkbox}
              />
              <label className={styles.checkboxLabel}>Multiple Choice</label>
            </div>
            <div className={styles.checkboxOption}>
              <Checkbox
                checked={settings.questionTypes.matching}
                onCheckedChange={(checked) =>
                  handleCheckedChange("matching", checked)
                }
                className={styles.checkbox}
              />
              <label className={styles.checkboxLabel}>Matching</label>
            </div>
          </div>
        </div>

        <Button onClick={handleStartTest} className={styles.startTestButton}>
          Start Test
        </Button>
      </div>
    </div>
  );
}
