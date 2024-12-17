"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
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

export function MatchingQuestion({
  question,
  questionNumber,
  onAnswer,
  onDontKnow,
}: MatchingQuestionProps) {
  // Parse current answers from userAnswer string
  const currentAnswers = question.userAnswer
    ? JSON.parse(question.userAnswer)
    : {};

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      // If dropped outside any droppable area, remove the answer from its current position
      if (result.source.droppableId !== "answerBank") {
        const newAnswers = { ...currentAnswers };
        delete newAnswers[result.source.droppableId];
        onAnswer(question.id, JSON.stringify(newAnswers));
      }
      return;
    }

    const { source, destination } = result;

    // Handle swapping if destination already has an answer
    if (currentAnswers[destination.droppableId]) {
      const newAnswers = { ...currentAnswers };

      // If coming from another answer box (swapping)
      if (source.droppableId !== "answerBank") {
        newAnswers[source.droppableId] =
          currentAnswers[destination.droppableId];
      } else {
        // If coming from answer bank, remove the previous answer
        delete newAnswers[destination.droppableId];
      }

      newAnswers[destination.droppableId] = result.draggableId;
      onAnswer(question.id, JSON.stringify(newAnswers));
      return;
    }

    // Handle normal placement
    const newAnswers = { ...currentAnswers };
    if (source.droppableId !== "answerBank") {
      delete newAnswers[source.droppableId];
    }
    newAnswers[destination.droppableId] = result.draggableId;
    onAnswer(question.id, JSON.stringify(newAnswers));
  };

  const handleDontKnow = () => {
    if (!question.options) return;

    // Create correct answer mapping
    const correctAnswers = {};
    question.options.terms.forEach((_, index) => {
      correctAnswers[`answer-${index}`] = `answer-${index}`;
    });

    onAnswer(question.id, JSON.stringify(correctAnswers));
    onDontKnow(question.id);
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionNumber}>Question {questionNumber}</div>

      <DragDropContext onDragEnd={handleDragEnd}>
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
              <Droppable key={index} droppableId={`answer-${index}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${styles.answerBox} ${
                      snapshot.isDraggingOver ? styles.dragOver : ""
                    }`}
                  >
                    {currentAnswers[`answer-${index}`] && (
                      <Draggable
                        key={currentAnswers[`answer-${index}`]}
                        draggableId={currentAnswers[`answer-${index}`]}
                        index={0}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${styles.answerOption} ${
                              snapshot.isDragging ? styles.dragging : ""
                            } ${
                              question.userAnswer === "dontknow"
                                ? styles.correctAnswer
                                : ""
                            }`}
                          >
                            <span>
                              {
                                question.options?.answers[
                                  parseInt(
                                    currentAnswers[`answer-${index}`].split(
                                      "-"
                                    )[1]
                                  )
                                ]
                              }
                            </span>
                          </div>
                        )}
                      </Draggable>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>

        {/* Answer Bank */}
        <Droppable droppableId="answerBank" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.answerBank}
            >
              {question.options?.answers.map((answer, index) => {
                // Don't show answers that are already placed
                const isPlaced = Object.values(currentAnswers).includes(
                  `answer-${index}`
                );
                if (isPlaced) return null;

                return (
                  <Draggable
                    key={`answer-${index}`}
                    draggableId={`answer-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.answerOption} ${
                          snapshot.isDragging ? styles.dragging : ""
                        }`}
                      >
                        <span>{answer}</span>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
