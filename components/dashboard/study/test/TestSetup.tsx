"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { GraduationCap, CheckCircle2, XCircle, Timer } from "lucide-react";
import styles from "./test.module.css";

export interface TestSettings {
  questionCount: number;
  timeLimit: number;
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
    timeLimit: 10,
    questionTypes: {
      trueFalse: true,
      multipleChoice: true,
      matching: true,
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
              <GraduationCap />
            </div>
            <div className={styles.iconCard}>
              <GraduationCap />
            </div>
            <div className={styles.iconCard}>
              <GraduationCap />
            </div>
            <div className={styles.iconCard}>
              <GraduationCap />
            </div>
            <div className={styles.iconCard}>
              <GraduationCap />
            </div>
            <div className={styles.iconCard}>
              <GraduationCap />
            </div>
          </div>
        </div>

        <div className={styles.introText}>
          <h1 className={styles.readyText}>Ready to test your knowledge?</h1>
          <p className={styles.gameDescription}>
            Customize your test settings below to begin the challenge
          </p>
        </div>

        <Button
          onClick={scrollToPreferences}
          className={styles.configureButton}
        >
          Configure Test
        </Button>
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
    </div>
  );
}
