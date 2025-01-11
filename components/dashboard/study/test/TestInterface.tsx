"use client";

import { useState, useEffect } from "react";
import { TestSettings } from "./TestSetup";
import { Timer } from "./Timer";
import { TrueFalseQuestion } from "./questions/TrueFalseQuestion";
import { MultipleChoiceQuestion } from "./questions/MultipleChoiceQuestion";
import { TestResults } from "./TestResults";
import styles from "./test.module.css";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

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

// Union type for TestQuestion
type TestQuestion = TrueFalseTestQuestion | MultipleChoiceTestQuestion;

interface TestInterfaceProps {
  settings: TestSettings;
  questions: Question[];
  onComplete: (results: any) => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

function generateQuestions(
  questions: Question[],
  settings: TestSettings
): TestQuestion[] {
  console.log("Input questions:", questions);
  console.log("Settings:", settings);

  // Make sure we don't try to get more questions than we have
  const questionCount = Math.min(settings.questionCount, questions.length);

  // Shuffle all questions first
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

  // Take only the number of questions we need
  const selectedQuestions = shuffledQuestions.slice(0, questionCount);

  console.log("Selected questions:", selectedQuestions);

  const enabledTypes = Object.entries(settings.questionTypes)
    .filter(([_, enabled]) => enabled)
    .map(([type]) => type as "trueFalse" | "multipleChoice");

  if (enabledTypes.length === 0) return [];

  // Map each selected question to a test question
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
        // Get a random wrong answer from other questions
        const otherQuestions = shuffledQuestions.filter(
          (wrong) => wrong.id !== q.id
        );
        const randomWrongAnswer =
          otherQuestions[Math.floor(Math.random() * otherQuestions.length)];

        // Randomly decide if we show the correct or wrong pair
        const showCorrectPair = Math.random() > 0.5;

        return {
          ...baseQuestion,
          type: "trueFalse",
          options: {
            term: q.question,
            definition: showCorrectPair ? q.answer : randomWrongAnswer.answer,
          },
          // Store whether this is a matching pair for checking the answer
          answer: showCorrectPair ? "match" : "dontmatch",
        };
      }

      case "multipleChoice": {
        // Get wrong answers from other questions
        const wrongAnswers = shuffledQuestions
          .filter((wrong) => wrong.id !== q.id)
          .slice(0, 3)
          .map((wrong) => wrong.answer);

        return {
          ...baseQuestion,
          type: "multipleChoice",
          options: [...wrongAnswers, q.answer].sort(() => Math.random() - 0.5),
        };
      }
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
    } else if (q.userAnswer.toLowerCase() === q.answer.toLowerCase()) {
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

  // Round to whole number instead of decimal
  results.score = Math.round((results.correct / results.total) * 100);
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    (number | string | null)[]
  >([]);
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(
    new Array(testQuestions.length).fill(false)
  );
  const [fontSize, setFontSize] = useState(() => {
    // Use the same localStorage key to maintain consistency with flashcards
    const saved = localStorage.getItem("flashcards-font-size");
    return saved ? parseInt(saved) : 16;
  });

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
    const currentQ = testQuestions[currentQuestion];
    const newRevealedAnswers = [...revealedAnswers];
    newRevealedAnswers[currentQuestion] = true;
    setRevealedAnswers(newRevealedAnswers);

    // Set the correct answer in selectedAnswers
    const newSelectedAnswers = [...selectedAnswers];
    if (currentQ.type === "multipleChoice") {
      // For multiple choice, find the index of the correct answer
      const correctIndex = currentQ.options.indexOf(currentQ.answer);
      newSelectedAnswers[currentQuestion] = correctIndex;
    } else if (currentQ.type === "trueFalse") {
      // For true/false, set the correct match/dontmatch value
      newSelectedAnswers[currentQuestion] = currentQ.answer;
    }
    setSelectedAnswers(newSelectedAnswers);

    // Update the question's userAnswer
    handleAnswerChange(currentQ.id, "dontknow");
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

  const handleAnswer = (answer: string) => {
    const currentQ = testQuestions[currentQuestion];

    if (currentQ.type === "trueFalse") {
      // For true/false, store the answer directly
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = answer; // Store "match" or "dontmatch"
      setSelectedAnswers(newAnswers);
    } else {
      // For multiple choice, store the index
      const newAnswers = [...selectedAnswers];
      const answerIndex = currentQ.options.indexOf(answer);
      newAnswers[currentQuestion] = answerIndex;
      setSelectedAnswers(newAnswers);
    }

    handleAnswerChange(currentQ.id, answer);
  };

  const nextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);

      // If this question was revealed before, show the correct answer
      if (revealedAnswers[currentQuestion + 1]) {
        const nextQ = testQuestions[currentQuestion + 1];
        if (nextQ.type === "multipleChoice") {
          const correctIndex = nextQ.options.findIndex(
            (option) => option === nextQ.answer
          );
          setSelectedAnswer(correctIndex);
        } else if (nextQ.type === "trueFalse") {
          // For trueFalse questions, we'll store the index of the correct answer (0 for match, 1 for don't match)
          setSelectedAnswer(nextQ.answer === "match" ? 0 : 1);
        }
      } else {
        const nextAnswer = selectedAnswers[currentQuestion + 1];
        setSelectedAnswer(typeof nextAnswer === "number" ? nextAnswer : null);
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);

      // If this question was revealed before, show the correct answer
      if (revealedAnswers[currentQuestion - 1]) {
        const prevQ = testQuestions[currentQuestion - 1];
        if (prevQ.type === "multipleChoice") {
          const correctIndex = prevQ.options.findIndex(
            (option) => option === prevQ.answer
          );
          setSelectedAnswer(correctIndex);
        } else if (prevQ.type === "trueFalse") {
          // For trueFalse questions, we'll store the index of the correct answer (0 for match, 1 for don't match)
          setSelectedAnswer(prevQ.answer === "match" ? 0 : 1);
        }
      } else {
        const prevAnswer = selectedAnswers[currentQuestion - 1];
        setSelectedAnswer(typeof prevAnswer === "number" ? prevAnswer : null);
      }
    }
  };

  const areAllQuestionsAnswered = () => {
    return testQuestions.every((q) => q.userAnswer !== undefined);
  };

  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
    localStorage.setItem("flashcards-font-size", value.toString());
  };

  const renderAnswerOptions = () => {
    const currentQ = testQuestions[currentQuestion];

    if (currentQ.type === "trueFalse") {
      return (
        <>
          <div className={styles.answerButtons}>
            <Button onClick={() => handleAnswer("match")} variant="outline">
              Match
            </Button>
            <Button onClick={() => handleAnswer("dontmatch")} variant="outline">
              Don't Match
            </Button>
          </div>
          <Button
            onClick={() => handleDontKnow(currentQ.id)}
            variant="outline"
            className={styles.dontKnowButton}
          >
            Don't Know
          </Button>
        </>
      );
    }

    // For multiple choice questions
    return (
      <>
        <div className={styles.answerOptions}>
          {testQuestions[currentQuestion].type === "multipleChoice" ? (
            (
              (testQuestions[currentQuestion] as MultipleChoiceTestQuestion)
                .options as string[]
            ).map((option, index) => (
              <motion.button
                key={index}
                className={cn(styles.answerOption, {
                  [styles.selected]: selectedAnswers[currentQuestion] === index,
                  [styles.revealed]:
                    revealedAnswers[currentQuestion] &&
                    option === testQuestions[currentQuestion].answer,
                })}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleAnswer(option)}
                disabled={revealedAnswers[currentQuestion]}
              >
                <span
                  className="block"
                  style={{ fontSize: `${fontSize - 2}px` }}
                >
                  {option}
                </span>
              </motion.button>
            ))
          ) : (
            // True/False section
            <div className="space-y-6">
              {/* Question-Answer Pair Box */}
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
                <div style={{ fontSize: `${fontSize}px` }}>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Term
                  </h3>
                  <div className="text-foreground">
                    {
                      (testQuestions[currentQuestion] as TrueFalseTestQuestion)
                        .options.term
                    }
                  </div>
                </div>
                <div style={{ fontSize: `${fontSize}px` }}>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Definition
                  </h3>
                  <div className="text-foreground">
                    {
                      (testQuestions[currentQuestion] as TrueFalseTestQuestion)
                        .options.definition
                    }
                  </div>
                </div>
              </div>

              {/* Match/Don't Match Buttons - fixed size */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleAnswer("match")}
                  className="w-32 h-12 rounded-lg bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <span className="block">Match</span>
                </button>
                <button
                  onClick={() => handleAnswer("dontmatch")}
                  className="w-32 h-12 rounded-lg bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <span className="block">Don't Match</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <Button
          onClick={() => handleDontKnow(testQuestions[currentQuestion].id)}
          variant="outline"
          className={cn(styles.dontKnowButton, {
            [styles.revealed]: revealedAnswers[currentQuestion],
          })}
        >
          {revealedAnswers[currentQuestion] ? "Answer Revealed" : "Don't Know"}
        </Button>
      </>
    );
  };

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
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentQuestion + 1) / testQuestions.length) * 100}%`,
          }}
        />
      </div>

      {/* Timer */}
      <div
        className={cn(styles.timer, { [styles.warning]: timeRemaining < 30 })}
      >
        <Clock className="w-5 h-5" />
        <span>{formatTime(timeRemaining)}</span>
      </div>

      {testQuestions.length > 0 && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.questionCard}
            >
              <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                  {/* Question header with number and font size control */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-green-500 font-medium">
                      Question {currentQuestion + 1} of {testQuestions.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 min-w-[120px] sm:min-w-[150px]">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Aa
                        </span>
                        <Slider
                          value={[fontSize]}
                          onValueChange={(value) =>
                            handleFontSizeChange(value[0])
                          }
                          min={12}
                          max={32}
                          step={2}
                          className="w-16 sm:w-24"
                        />
                        <span className="text-sm sm:text-base text-gray-500">
                          Aa
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Replace the custom implementation with the imported components */}
                  {testQuestions[currentQuestion].type === "multipleChoice" ? (
                    <MultipleChoiceQuestion
                      question={
                        testQuestions[
                          currentQuestion
                        ] as MultipleChoiceTestQuestion
                      }
                      questionNumber={currentQuestion + 1}
                      onAnswer={handleAnswerChange}
                      onDontKnow={handleDontKnow}
                      fontSize={fontSize}
                    />
                  ) : (
                    <TrueFalseQuestion
                      question={
                        testQuestions[currentQuestion] as TrueFalseTestQuestion
                      }
                      questionNumber={currentQuestion + 1}
                      onAnswer={handleAnswerChange}
                      onDontKnow={handleDontKnow}
                      fontSize={fontSize}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            className={styles.previousButton}
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          <div
            className={cn(styles.submitButtonContainer, {
              [styles.visible]: areAllQuestionsAnswered(),
            })}
          >
            <button
              className={styles.submitButton}
              onClick={handleTestComplete}
            >
              Submit Test
            </button>
          </div>

          <button
            className={styles.nextButton}
            onClick={nextQuestion}
            disabled={currentQuestion === testQuestions.length - 1}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
