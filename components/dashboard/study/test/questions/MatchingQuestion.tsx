"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Button } from "@/components/ui/button";
import styles from "../test.module.css";

interface MatchingQuestionProps {
  question: {
    id: string;
    question: string;
    answer: string;
    options?: {
      terms: string[];
      answers: string[];
    };
    userAnswer?: string | null;
  };
  questionNumber: number;
  onAnswer: (id: string, answer: string) => void;
  onDontKnow: (id: string) => void;
}

interface DraggableAnswer {
  id: string;
  text: string;
}

function DraggableItem({
  answer,
  isInAnswerBank = false,
}: {
  answer: DraggableAnswer;
  isInAnswerBank?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: answer.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0 : undefined,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${styles.answerOption} ${
        isInAnswerBank ? styles.bankAnswer : ""
      }`}
      style={style}
    >
      <span>{answer.text}</span>
    </div>
  );
}

function DroppableSpot({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.answerBox} ${isOver ? styles.dragOver : ""}`}
    >
      {children}
    </div>
  );
}

export function MatchingQuestion({
  question,
  questionNumber,
  onAnswer,
  onDontKnow,
}: MatchingQuestionProps) {
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>(
    () => (question.userAnswer ? JSON.parse(question.userAnswer) : {})
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over || over.id === "answerBank") {
      // If dropped outside or on answer bank, remove from current position
      const newAnswers = { ...currentAnswers };
      Object.keys(newAnswers).forEach((key) => {
        if (newAnswers[key] === active.id) {
          delete newAnswers[key];
        }
      });
      setCurrentAnswers(newAnswers);
      onAnswer(question.id, JSON.stringify(newAnswers));
      return;
    }

    const answerId = active.id as string;
    const dropzoneId = over.id as string;

    // Handle dropping in a new spot
    const newAnswers = { ...currentAnswers };

    // Remove from previous position if it was already placed
    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key] === answerId) {
        delete newAnswers[key];
      }
    });

    // If there's already an answer in the target spot
    if (newAnswers[dropzoneId]) {
      const existingAnswer = newAnswers[dropzoneId];
      const sourceSpot = Object.entries(newAnswers).find(
        ([_, v]) => v === answerId
      )?.[0];
      if (sourceSpot) {
        newAnswers[sourceSpot] = existingAnswer;
      }
    }

    newAnswers[dropzoneId] = answerId;
    setCurrentAnswers(newAnswers);
    onAnswer(question.id, JSON.stringify(newAnswers));
  };

  const handleDontKnow = () => {
    if (!question.options) return;
    const correctAnswers: Record<string, string> = {};
    question.options.terms.forEach((_, index) => {
      correctAnswers[`answer-${index}`] = `answer-${index}`;
    });
    setCurrentAnswers(correctAnswers);
    onAnswer(question.id, JSON.stringify(correctAnswers));
    onDontKnow(question.id);
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionNumber}>Question {questionNumber}</div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div className={styles.matchingContainer}>
          {/* Terms Column */}
          <div className={styles.termsColumn}>
            {question.options?.terms.map((term, index) => (
              <div key={index} className={styles.termBox}>
                {term}
              </div>
            ))}
          </div>

          {/* Answer Boxes Column */}
          <div className={styles.answersColumn}>
            {question.options?.terms.map((_, index) => (
              <DroppableSpot key={index} id={`answer-${index}`}>
                {currentAnswers[`answer-${index}`] && (
                  <DraggableItem
                    answer={{
                      id: currentAnswers[`answer-${index}`],
                      text: question.options!.answers[
                        parseInt(
                          currentAnswers[`answer-${index}`].split("-")[1]
                        )
                      ],
                    }}
                  />
                )}
              </DroppableSpot>
            ))}
          </div>
        </div>

        {/* Answer Bank */}
        <DroppableSpot id="answerBank">
          <div className={styles.answerBank}>
            {question.options?.answers.map((answer, index) => {
              const answerId = `answer-${index}`;
              const isPlaced = Object.values(currentAnswers).includes(answerId);

              if (!isPlaced) {
                return (
                  <DraggableItem
                    key={answerId}
                    answer={{ id: answerId, text: answer }}
                    isInAnswerBank={true}
                  />
                );
              }
              return null;
            })}
          </div>
        </DroppableSpot>

        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <div className={`${styles.answerOption} ${styles.dragging}`}>
              <span>
                {question.options?.answers[parseInt(activeId.split("-")[1])]}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

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
