"use client";

import { Button } from "@/components/ui/button";
import styles from "../test.module.css";

interface TrueFalseTestQuestion {
  id: string;
  type: "trueFalse";
  question: string;
  answer: string;
  userAnswer?: string | null;
  options: {
    term: string;
    definition: string;
  };
}

interface TrueFalseQuestionProps {
  question: TrueFalseTestQuestion;
  questionNumber: number;
  onAnswer: (id: string, answer: string) => void;
  onDontKnow: (id: string) => void;
  fontSize: number;
}

export function TrueFalseQuestion({
  question,
  questionNumber,
  onAnswer,
  onDontKnow,
  fontSize,
}: TrueFalseQuestionProps) {
  const handleDontKnow = () => {
    onAnswer(question.id, "dontknow");
    onDontKnow(question.id);
  };

  return (
    <>
      <div className={styles.trueFalseContainer}>
        <div className={styles.questionSide}>
          <div className={styles.questionLabel}>Term</div>
          <div
            className={styles.questionText}
            style={{ fontSize: `${fontSize}px` }}
          >
            {question.options.term}
          </div>
        </div>
        <div className={styles.answerSide}>
          <div className={styles.questionLabel}>Definition</div>
          <div
            className={styles.questionText}
            style={{ fontSize: `${fontSize}px` }}
          >
            {question.options.definition}
          </div>
        </div>
      </div>
      <div className={styles.trueFalseOptions}>
        <button
          onClick={() => onAnswer(question.id, "match")}
          className={`${styles.matchButton} ${
            question.userAnswer === "match" ||
            (question.userAnswer === "dontknow" && question.answer === "match")
              ? styles.selected
              : ""
          }`}
          data-correct={
            question.userAnswer === "dontknow" && question.answer === "match"
          }
        >
          Match
        </button>
        <button
          onClick={() => onAnswer(question.id, "dontmatch")}
          className={`${styles.matchButton} ${
            question.userAnswer === "dontmatch" ||
            (question.userAnswer === "dontknow" &&
              question.answer === "dontmatch")
              ? styles.selected
              : ""
          }`}
          data-correct={
            question.userAnswer === "dontknow" &&
            question.answer === "dontmatch"
          }
        >
          Don't Match
        </button>
      </div>
      <Button
        variant='ghost'
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
