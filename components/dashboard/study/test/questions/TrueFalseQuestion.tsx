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
}

export function TrueFalseQuestion({
  question,
  questionNumber,
  onAnswer,
  onDontKnow,
}: TrueFalseQuestionProps) {
  const handleDontKnow = () => {
    // Set the correct answer first, then mark as "don't know"
    onAnswer(question.id, question.answer);
    onDontKnow(question.id);
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionNumber}>Question {questionNumber}</div>
      <div className={styles.trueFalseContainer}>
        <div className={styles.questionSide}>
          <div className={styles.questionLabel}>Term</div>
          <div className={styles.questionText}>{question.options.term}</div>
        </div>
        <div className={styles.answerSide}>
          <div className={styles.questionLabel}>Definition</div>
          <div className={styles.questionText}>
            {question.options.definition}
          </div>
        </div>
      </div>
      <div className={styles.answerOptions}>
        <Button
          variant={question.userAnswer === "true" ? "default" : "outline"}
          onClick={() => onAnswer(question.id, "true")}
          className={
            question.userAnswer === "dontknow" && question.answer === "true"
              ? styles.correctAnswer
              : ""
          }
        >
          Match
        </Button>
        <Button
          variant={question.userAnswer === "false" ? "default" : "outline"}
          onClick={() => onAnswer(question.id, "false")}
          className={
            question.userAnswer === "dontknow" && question.answer === "false"
              ? styles.correctAnswer
              : ""
          }
        >
          Don't Match
        </Button>
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
