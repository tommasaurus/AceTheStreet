"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import styles from "../test.module.css";

interface MatchingQuestionProps {
  question: {
    id: string;
    question: string;
    answer: string;
    userAnswer?: string | null;
  };
  onAnswer: (id: string, answer: string) => void;
  onDontKnow: (id: string) => void;
}

export function MatchingQuestion({
  question,
  onAnswer,
  onDontKnow,
}: MatchingQuestionProps) {
  return (
    <div className={styles.questionCard}>
      <div className={styles.questionText}>{question.question}</div>
      <div className={styles.matchingContainer}>
        {/* Matching UI will be implemented later */}
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
