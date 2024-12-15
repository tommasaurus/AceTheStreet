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

interface TestQuestion {
  id: string;
  type: "trueFalse" | "multipleChoice" | "matching";
  question: string;
  answer: string;
  options?: string[];
  userAnswer?: string | null;
}

interface TestInterfaceProps {
  settings: TestSettings;
  questions: Question[]; // Your question type from flashcards
  onComplete: (results: any) => void;
}

function generateQuestions(
  questions: Question[],
  settings: TestSettings
): TestQuestion[] {
  // Get a random subset of questions based on settings.questionCount
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffledQuestions.slice(0, settings.questionCount);

  // Distribute questions among selected types
  const enabledTypes = Object.entries(settings.questionTypes)
    .filter(([_, enabled]) => enabled)
    .map(([type]) => type as "trueFalse" | "multipleChoice" | "matching");

  if (enabledTypes.length === 0) return [];

  return selectedQuestions.map((q, index) => {
    // Rotate through enabled question types
    const questionType = enabledTypes[index % enabledTypes.length];

    const baseQuestion = {
      id: `q${index}`,
      type: questionType,
      question: q.question,
      answer: q.answer,
    };

    switch (questionType) {
      case "trueFalse":
        // For true/false, randomly pair with another answer
        const isTrue = Math.random() > 0.5;
        const randomWrongAnswer = shuffledQuestions.filter(
          (wrong) => wrong.answer !== q.answer
        )[Math.floor(Math.random() * (shuffledQuestions.length - 1))].answer;

        return {
          ...baseQuestion,
          question: q.question,
          answer: isTrue ? "true" : "false", // The correct answer is whether they match
          options: {
            term: q.question,
            definition: isTrue ? q.answer : randomWrongAnswer,
          },
        };

      case "multipleChoice":
        // Get 5 random wrong answers from other questions
        const wrongAnswers = shuffledQuestions
          .filter((wrong) => wrong.answer !== q.answer)
          .slice(0, 5)
          .map((wrong) => wrong.answer);

        return {
          ...baseQuestion,
          options: [...wrongAnswers, q.answer].sort(() => Math.random() - 0.5),
        };

      case "matching":
        return baseQuestion;

      default:
        return baseQuestion;
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

  // Calculate score based on correct answers only
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
    // Generate test questions based on selected types and count
    const generatedQuestions = generateQuestions(questions, settings);
    console.log("Generated Questions:", generatedQuestions); // Debug log
    setTestQuestions(generatedQuestions);
  }, [questions, settings]);

  useEffect(() => {
    if (settings.timeLimit === 0) return; // No time limit

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

    // Only show confetti for 100% score
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
        {testQuestions.map((question) => {
          switch (question.type) {
            case "trueFalse":
              return (
                <TrueFalseQuestion
                  key={question.id}
                  question={question}
                  onAnswer={handleAnswerChange}
                  onDontKnow={handleDontKnow}
                />
              );
            case "multipleChoice":
              return (
                <MultipleChoiceQuestion
                  key={question.id}
                  question={question}
                  onAnswer={handleAnswerChange}
                  onDontKnow={handleDontKnow}
                />
              );
            case "matching":
              return (
                <MatchingQuestion
                  key={question.id}
                  question={question}
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
