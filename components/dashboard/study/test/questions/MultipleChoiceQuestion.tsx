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
  fontSize: number;
}

export function MultipleChoiceQuestion({
  question,
  questionNumber,
  onAnswer,
  onDontKnow,
  fontSize,
}: MultipleChoiceQuestionProps) {
  const handleDontKnow = () => {
    onAnswer(question.id, question.answer);
    onDontKnow(question.id);
  };

  return (
    <>
      <div
        className={styles.questionText}
        style={{ fontSize: `${fontSize}px` }}
      >
        {question.question}
      </div>
      <div className={styles.answerOptions}>
        {question.options?.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(question.id, option)}
            className={`${styles.answerChoice} ${
              question.userAnswer === option ? styles.selected : ""
            }`}
            style={{ fontSize: `${fontSize - 2}px` }}
            data-correct={
              question.userAnswer === "dontknow" && option === question.answer
            }
          >
            {option}
          </button>
        ))}
      </div>
      <Button
        variant="ghost"
        className={`${styles.dontKnowButton} ${
          question.userAnswer === "dontknow" ? styles.selected : ""
        }`}
        onClick={handleDontKnow}
        data-selected={question.userAnswer === "dontknow"}
      >
        {question.userAnswer === "dontknow" ? "Answer Revealed" : "Don't know"}
      </Button>
    </>
  );
}
