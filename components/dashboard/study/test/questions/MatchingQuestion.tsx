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
    if (!result.destination) return;

    // Handle the drop and update answers
    const { source, destination } = result;
    const newAnswers = {
      ...currentAnswers,
      [destination.droppableId]: result.draggableId,
    };
    onAnswer(question.id, JSON.stringify(newAnswers));
  };

  const handleDontKnow = () => {
    // Create correct answer mapping - match each term with its corresponding answer
    const correctAnswers = question.options?.terms.reduce(
      (acc, _, index) => ({
        ...acc,
        [`answer-${index}`]: `answer-${index}`,
      }),
      {}
    );

    if (correctAnswers) {
      onAnswer(question.id, JSON.stringify(correctAnswers));
      onDontKnow(question.id);
    }
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
                      <div
                        className={`${styles.answerOption} ${
                          question.userAnswer === "dontknow"
                            ? styles.correctAnswer
                            : ""
                        }`}
                      >
                        {
                          question.options?.answers[
                            parseInt(
                              currentAnswers[`answer-${index}`].split("-")[1]
                            )
                          ]
                        }
                      </div>
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
                        {answer}
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
