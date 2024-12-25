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
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | number | null>(
    null
  );
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(
    new Array(testQuestions.length).fill(false)
  );

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
    const updatedQuestions = [...testQuestions];
    updatedQuestions[currentQuestion] = {
      ...currentQ,
      userAnswer: "dontknow",
    };
    setTestQuestions(updatedQuestions);
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

  const handleDragEnd = (event: any) => {
    if (!event.over) return;

    const { active, over } = event;

    // Update the questions state when an item is dropped
    const updatedQuestions = [...testQuestions];
    const currentQ = updatedQuestions[currentQuestion];

    if (currentQ.type === "matching") {
      // Handle the matching logic here
      // You might want to update the userAnswer with the new matching state
      const draggedId = active.id;
      const droppedId = over.id;

      // Update the question's state
      handleAnswerChange(
        currentQ.id,
        JSON.stringify({
          draggedId,
          droppedId,
        })
      );
    }
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
          setSelectedAnswer(nextQ.answer);
        }
      } else {
        setSelectedAnswer(selectedAnswers[currentQuestion + 1]);
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
          setSelectedAnswer(prevQ.answer);
        }
      } else {
        setSelectedAnswer(selectedAnswers[currentQuestion - 1]);
      }
    }
  };

  const areAllQuestionsAnswered = () => {
    return testQuestions.every(
      (q) => q.userAnswer || q.userAnswer === "dontknow"
    );
  };

  const renderAnswerOptions = () => {
    const currentQuestion = testQuestions[currentQuestion];

    if (currentQuestion.type === "true_false") {
      return (
        <>
          <div className={styles.answerButtons}>
            <Button onClick={() => handleAnswer("Match")} variant="outline">
              Match
            </Button>
            <Button
              onClick={() => handleAnswer("Don't Match")}
              variant="outline"
            >
              Don't Match
            </Button>
          </div>
          <Button
            onClick={() => handleAnswer("Don't Know")}
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
        <div className={styles.answerButtons}>
          {currentQuestion.options?.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              variant="outline"
            >
              {option}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => handleAnswer("Don't Know")}
          variant="outline"
          className={styles.dontKnowButton}
        >
          Don't Know
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
              <div className={styles.questionNumber}>
                Question {currentQuestion + 1} of {testQuestions.length}
              </div>

              {testQuestions[currentQuestion].type !== "trueFalse" && (
                <h2 className={styles.questionText}>
                  {testQuestions[currentQuestion].question}
                </h2>
              )}

              {/* Multiple Choice */}
              {testQuestions[currentQuestion].type === "multipleChoice" && (
                <>
                  <div className={styles.answerOptions}>
                    {testQuestions[currentQuestion].options.map(
                      (option, index) => (
                        <motion.button
                          key={index}
                          className={cn(styles.answerOption, {
                            [styles.selected]:
                              selectedAnswers[currentQuestion] === index,
                            [styles.revealed]:
                              revealedAnswers[currentQuestion] &&
                              option === testQuestions[currentQuestion].answer,
                          })}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            handleAnswer(option);
                          }}
                          disabled={revealedAnswers[currentQuestion]}
                        >
                          {option}
                        </motion.button>
                      )
                    )}
                  </div>
                  <Button
                    onClick={() =>
                      handleDontKnow(testQuestions[currentQuestion].id)
                    }
                    variant="outline"
                    className={styles.dontKnowButton}
                    disabled={revealedAnswers[currentQuestion]}
                  >
                    {revealedAnswers[currentQuestion]
                      ? "Answer Revealed"
                      : "Don't Know"}
                  </Button>
                </>
              )}

              {/* True/False */}
              {testQuestions[currentQuestion].type === "trueFalse" && (
                <>
                  <div className={styles.questionPair}>
                    <div className={styles.term}>
                      {testQuestions[currentQuestion].options.term}
                    </div>
                    <div className={styles.definition}>
                      {testQuestions[currentQuestion].options.definition}
                    </div>
                  </div>
                  <div className={styles.trueFalseOptions}>
                    <motion.button
                      className={cn(styles.trueFalseOption, styles.match, {
                        [styles.selected]:
                          selectedAnswers[currentQuestion] === "match",
                        [styles.revealed]:
                          revealedAnswers[currentQuestion] &&
                          testQuestions[currentQuestion].answer === "match",
                      })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer("match")}
                      disabled={revealedAnswers[currentQuestion]}
                    >
                      <CheckCircle />
                      Match
                    </motion.button>

                    <motion.button
                      className={cn(styles.trueFalseOption, styles.dontMatch, {
                        [styles.selected]:
                          selectedAnswers[currentQuestion] === "dontmatch",
                        [styles.revealed]:
                          revealedAnswers[currentQuestion] &&
                          testQuestions[currentQuestion].answer === "dontmatch",
                      })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer("dontmatch")}
                      disabled={revealedAnswers[currentQuestion]}
                    >
                      <XCircle />
                      Don't Match
                    </motion.button>
                  </div>
                  <div className={styles.dontKnowContainer}>
                    <motion.button
                      className={cn(styles.dontKnowButton, {
                        [styles.revealed]: revealedAnswers[currentQuestion],
                      })}
                      onClick={() =>
                        handleDontKnow(testQuestions[currentQuestion].id)
                      }
                      disabled={revealedAnswers[currentQuestion]}
                    >
                      {revealedAnswers[currentQuestion]
                        ? "Answer Revealed"
                        : "Don't Know"}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className={styles.navigationButtons}>
            <div className={styles.navButtonsGroup}>
              <button
                className={cn(styles.navButton, styles.configureButton)}
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
                className={cn(styles.navButton, styles.configureButton)}
                onClick={nextQuestion}
                disabled={currentQuestion === testQuestions.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
