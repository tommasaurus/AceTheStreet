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
  questionNumber: number;
  onAnswer: (id: string, answer: string) => void;
  onDontKnow: (id: string) => void;
}

export function MultipleChoiceQuestion({
  question,
  questionNumber,
  onAnswer,
  onDontKnow,
}: MultipleChoiceQuestionProps) {
  const handleDontKnow = () => {
    onAnswer(question.id, question.answer); // Set the correct answer first
    onDontKnow(question.id); // Then mark as "don't know"
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionNumber}>Question {questionNumber}</div>
      <div className={styles.questionText}>{question.question}</div>
      <div className={styles.answerOptions}>
        {question.options?.map((option) => (
          <Button
            key={option}
            variant={question.userAnswer === option ? "default" : "outline"}
            onClick={() => onAnswer(question.id, option)}
            className={
              question.userAnswer === "dontknow" && question.answer === option
                ? styles.correctAnswer
                : ""
            }
          >
            {option}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        className={styles.dontKnowButton}
        onClick={handleDontKnow}
      >
        Don't know
      </Button>
    </div>
  );
}
