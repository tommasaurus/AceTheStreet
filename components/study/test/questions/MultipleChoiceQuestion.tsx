"use client";

import { Button } from "@/components/ui/button";
import styles from "../test.module.css";

interface MultipleChoiceQuestionProps {
  question: {
    id: string;
    question: string;
    answer: string;
    options?: string[];
    userAnswer?: string | null;
  };
  onAnswer: (id: string, answer: string) => void;
  onDontKnow: (id: string) => void;
}

export function MultipleChoiceQuestion({
  question,
  onAnswer,
  onDontKnow,
}: MultipleChoiceQuestionProps) {
  return (
    <div className={styles.questionCard}>
      <div className={styles.questionText}>{question.question}</div>
      <div className={styles.answerOptions}>
        {question.options?.map((option) => (
          <Button
            key={option}
            variant={question.userAnswer === option ? "default" : "outline"}
            onClick={() => onAnswer(question.id, option)}
          >
            {option}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        className={styles.dontKnowButton}
        onClick={() => onDontKnow(question.id)}
      >
        Don't know
      </Button>
    </div>
  );
}
