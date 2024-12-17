"use client";

import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { TestSettings } from "./TestSetup";
import { Timer } from "./Timer";
import { TrueFalseQuestion } from "./questions/TrueFalseQuestion";
import { MultipleChoiceQuestion } from "./questions/MultipleChoiceQuestion";
import { MatchingQuestion } from "./questions/MatchingQuestion";
import { TestResults } from "./TestResults";
import styles from "./test.module.css";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  type: string;
  question: string;
  answer: string;
  completed?: boolean;
  bookmarked?: boolean;
}

// Specialized interfaces for each question type
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

interface MultipleChoiceTestQuestion {
  id: string;
  type: "multipleChoice";
  question: string;
  answer: string;
  userAnswer?: string | null;
  options: string[];
}

interface MatchingTestQuestion {
  id: string;
  type: "matching";
  question: string;
  answer: string;
  userAnswer?: string | null;
  options: {
    terms: string[];
    answers: string[];
  };
}

// Union type for TestQuestion
type TestQuestion =
  | TrueFalseTestQuestion
  | MultipleChoiceTestQuestion
  | MatchingTestQuestion;

interface TestInterfaceProps {
  settings: TestSettings;
  questions: Question[];
  onComplete: (results: any) => void;
}

function generateQuestions(
  questions: Question[],
  settings: TestSettings
): TestQuestion[] {
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffledQuestions.slice(0, settings.questionCount);

  const enabledTypes = Object.entries(settings.questionTypes)
    .filter(([_, enabled]) => enabled)
    .map(([type]) => type as "trueFalse" | "multipleChoice" | "matching");

  if (enabledTypes.length === 0) return [];

  return selectedQuestions.map((q, index) => {
    const questionType =
      enabledTypes[Math.floor(Math.random() * enabledTypes.length)];

    const baseQuestion = {
      id: `q${q.id}`,
      type: questionType,
      question: q.question,
      answer: q.answer,
    };

    switch (questionType) {
      case "trueFalse": {
        const isTrue = Math.random() > 0.5;
        const randomWrongAnswer = shuffledQuestions.filter(
          (wrong) => wrong.answer !== q.answer
        )[Math.floor(Math.random() * (shuffledQuestions.length - 1))].answer;

        const tfQuestion: TrueFalseTestQuestion = {
          ...baseQuestion,
          type: "trueFalse",
          answer: isTrue ? "true" : "false",
          options: {
            term: q.question,
            definition: isTrue ? q.answer : randomWrongAnswer,
          },
        };
        return tfQuestion;
      }

      case "multipleChoice": {
        const wrongAnswers = shuffledQuestions
          .filter((wrong) => wrong.answer !== q.answer)
          .slice(0, 5)
          .map((wrong) => wrong.answer);

        const mcQuestion: MultipleChoiceTestQuestion = {
          ...baseQuestion,
          type: "multipleChoice",
          options: [...wrongAnswers, q.answer].sort(() => Math.random() - 0.5),
        };
        return mcQuestion;
      }

      case "matching": {
        const availableQuestions = shuffledQuestions.filter(
          (otherQ) =>
            otherQ.id !== q.id &&
            !selectedQuestions
              .slice(0, index)
              .some((usedQ) => usedQ.id === otherQ.id)
        );

        const matchingPairs = availableQuestions.slice(0, 3).concat([q]);

        if (matchingPairs.length < 4) {
          const fallbackMC: MultipleChoiceTestQuestion = {
            ...baseQuestion,
            type: "multipleChoice",
            options: [
              ...availableQuestions.slice(0, 3).map((x) => x.answer),
              q.answer,
            ].sort(() => Math.random() - 0.5),
          };
          return fallbackMC;
        }

        const terms = matchingPairs.map((p) => p.question);
        const answers = matchingPairs
          .map((p) => p.answer)
          .sort(() => Math.random() - 0.5);

        const matchQuestion: MatchingTestQuestion = {
          ...baseQuestion,
          type: "matching",
          options: {
            terms,
            answers,
          },
        };
        return matchQuestion;
      }

      default:
        // Should never hit here because we've enumerated all types
        // Just return a multipleChoice question by fallback
        const fallbackMC: MultipleChoiceTestQuestion = {
          ...baseQuestion,
          type: "multipleChoice",
          options: [q.answer],
        };
        return fallbackMC;
    }
  });
}

function calculateResults(testQuestions: TestQuestion[]) {
  const results = {
    total: testQuestions.length,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    score: 0,
    answers: [] as {
      question: string;
      userAnswer: string;
      correctAnswer: string;
    }[],
  };

  testQuestions.forEach((q) => {
    if (!q.userAnswer || q.userAnswer === "dontknow") {
      results.skipped++;
    } else if (q.userAnswer === q.answer) {
      results.correct++;
    } else {
      results.incorrect++;
    }

    results.answers.push({
      question: q.question,
      userAnswer: q.userAnswer || "skipped",
      correctAnswer: q.answer,
    });
  });

  results.score = (results.correct / results.total) * 100;
  return results;
}

export function TestInterface({
  settings,
  questions,
  onComplete,
}: TestInterfaceProps) {
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(settings.timeLimit * 60);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    const generatedQuestions = generateQuestions(questions, settings);
    setTestQuestions(generatedQuestions);
  }, [questions, settings]);

  useEffect(() => {
    if (settings.timeLimit === 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.timeLimit]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setTestQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, userAnswer: answer } : q))
    );
  };

  const handleDontKnow = (questionId: string) => {
    setTestQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, userAnswer: "dontknow" } : q
      )
    );
  };

  const handleTestComplete = () => {
    const results = calculateResults(testQuestions);
    setResults(results);
    setIsComplete(true);
    setTimeTaken(settings.timeLimit * 60 - timeRemaining);

    if (results.score === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    onComplete(results);
  };

  const handleRestart = () => {
    onComplete(null);
  };

  const isAllAnswered = testQuestions.every(
    (q) => q.userAnswer || q.userAnswer === ""
  );

  if (isComplete && results) {
    return (
      <TestResults
        results={results}
        timeTaken={timeTaken}
        timeLimit={settings.timeLimit * 60}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className={styles.testContainer}>
      {settings.timeLimit > 0 && (
        <Timer timeRemaining={timeRemaining} isComplete={isComplete} />
      )}

      <div className={styles.questionsContainer}>
        {testQuestions.map((question, index) => {
          switch (question.type) {
            case "trueFalse":
              return (
                <TrueFalseQuestion
                  key={question.id}
                  question={question}
                  questionNumber={index + 1}
                  onAnswer={handleAnswerChange}
                  onDontKnow={handleDontKnow}
                />
              );
            case "multipleChoice":
              return (
                <MultipleChoiceQuestion
                  key={question.id}
                  question={question}
                  questionNumber={index + 1}
                  onAnswer={handleAnswerChange}
                  onDontKnow={handleDontKnow}
                />
              );
            case "matching":
              return (
                <MatchingQuestion
                  key={question.id}
                  question={question}
                  questionNumber={index + 1}
                  onAnswer={handleAnswerChange}
                  onDontKnow={handleDontKnow}
                />
              );
          }
        })}
      </div>

      <button
        className={styles.submitButton}
        onClick={handleTestComplete}
        disabled={!isAllAnswered}
      >
        Submit Test
      </button>
    </div>
  );
}
