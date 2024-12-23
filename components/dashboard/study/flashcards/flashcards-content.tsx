"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RotateCcw,
  Volume2,
  Bookmark,
  LightbulbIcon,
  GraduationCap,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchContent from "@/components/dashboard/study/match/MatchContent";
import {
  TestSetup,
  TestSettings,
} from "@/components/dashboard/study/test/TestSetup";
import { TestInterface } from "@/components/dashboard/study/test/TestInterface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Question {
  id: number;
  type: string;
  question: string;
  answer: string;
  completed: boolean;
  bookmarked: boolean;
}

interface BankContent {
  bank: string;
  questions: Question[];
}

interface CategoryContent {
  category: string;
  questions: Question[];
}

type QuestionsData = {
  banks: {
    [key: string]: BankContent; // Index signature allows arbitrary string keys
  };
  "m-and-i": {
    [key: string]: CategoryContent; // Same here
  };
};

// Explicitly type the sampleQuestions object as QuestionsData:
const sampleQuestions: QuestionsData = {
  banks: {
    "goldman-sachs-1": {
      bank: "Goldman Sachs",
      questions: [
        {
          id: 1,
          type: "Technical",
          question: "Walk me through a DCF for a SaaS companys",
          answer:
            "Key components for a SaaS DCF:\n\n1. Revenue Growth: Focus on user growth and ARPU\n2. Margins: Consider R&D and S&M spend\n3. Working Capital: Usually minimal for SaaS\n4. Terminal Value: Use revenue or EBITDA multiples\n5. Discount Rate: Higher for early-stage companies",
          completed: false,
          bookmarked: false,
        },
        {
          id: 2,
          type: "Technical",
          question: "How would you value a pre-revenue startup?",
          answer:
            "Valuation approaches for pre-revenue startups:\n1. Comparable company analysis using alternative metrics\n2. Recent funding rounds and valuations\n3. Bottom-up market sizing and penetration\n4. Quality of team and IP\n5. Strategic value to potential acquirers",
          completed: false,
          bookmarked: false,
        },
        {
          id: 3,
          type: "Technical",
          question: "What's the impact of increasing depreciation by $10?",
          answer:
            "Impact of $10 increase in depreciation:\n1. Income Statement: EBIT decreases by $10, Net Income decreases by $10*(1-tax rate)\n2. Balance Sheet: Accumulated depreciation increases by $10\n3. Cash Flow: No impact on cash flow, add back to get FCFF\n4. Valuation: No direct impact on enterprise value",
          completed: false,
          bookmarked: false,
        },
      ],
    },
    "morgan-stanley-1": {
      bank: "Morgan Stanley",
      questions: [
        {
          id: 1,
          type: "Technical",
          question: "Walk me through a leveraged buyout model",
          answer:
            "Key LBO components:\n1. Purchase Price and Capital Structure\n2. Debt Schedule and Interest Expense\n3. Operational Projections\n4. Cash Flow Available for Debt Paydown\n5. Exit Multiple and Returns Analysis",
          completed: false,
          bookmarked: false,
        },
        {
          id: 2,
          type: "Technical",
          question: "What makes a good LBO candidate?",
          answer:
            "Ideal LBO characteristics:\n1. Stable Cash Flows\n2. Strong Market Position\n3. Low Capital Expenditure Requirements\n4. Operational Improvement Opportunities\n5. Clear Exit Strategy",
          completed: false,
          bookmarked: false,
        },
        {
          id: 3,
          type: "Behavioral",
          question: "Why Morgan Stanley?",
          answer:
            "Key points to address:\n1. Strong M&A and Capital Markets Platform\n2. Sector Expertise and Market Leadership\n3. Training and Development Programs\n4. Culture and Team Dynamic\n5. Recent Notable Transactions",
          completed: false,
          bookmarked: false,
        },
      ],
    },
  },
  "m-and-i": {
    "valuation-1": {
      category: "Valuation",
      questions: [
        {
          id: 1,
          type: "Technical",
          question: "What are the three main valuation methodologies?",
          answer:
            "The three main valuation methodologies are:\n\n1. Comparable Company Analysis (Trading Multiples)\n2. Precedent Transactions Analysis\n3. Discounted Cash Flow Analysis (DCF)",
          completed: false,
          bookmarked: false,
        },
      ],
    },
  },
};

interface FlashcardsContentProps {
  category: "banks" | "m-and-i";
  bankId?: string;
  categoryId?: string;
}

export function FlashcardsContent({
  category,
  bankId,
  categoryId,
}: FlashcardsContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [fontSize, setFontSize] = useState(16);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTestMode, setIsTestMode] = useState(false);
  const [testSettings, setTestSettings] = useState<TestSettings | null>(null);

  const handleStartTest = (settings: TestSettings) => {
    if (
      !settings.questionTypes.trueFalse &&
      !settings.questionTypes.multipleChoice &&
      !settings.questionTypes.matching
    ) {
      toast.error("Please select at least one question type");
      return;
    }

    if (settings.questionCount === 0) {
      toast.error("Please enter the number of questions");
      return;
    }

    if (settings.timeLimit < 1 || settings.timeLimit > 120) {
      toast.error("Please enter a valid time limit between 1 and 120 minutes");
      return;
    }

    setTestSettings(settings);
    setIsTestMode(true);
  };

  const handleTestComplete = (results: any) => {
    if (results === null) {
      setIsTestMode(false);
      setTestSettings(null);
    } else {
      console.log("Test completed with results:", results);
    }
  };

  const handleTabChange = (value: string) => {
    if (value !== "test") {
      setIsTestMode(false);
      setTestSettings(null);
    }
  };

  const id = category === "banks" ? bankId : categoryId;

  let content;
  if (category === "banks" && id && id in sampleQuestions.banks) {
    content = sampleQuestions.banks[id];
  } else if (category === "m-and-i" && id && id in sampleQuestions["m-and-i"]) {
    content = sampleQuestions["m-and-i"][id];
  }

  const questions = content?.questions || [];

  const remainingCards = questions.filter(
    (q) => !completedCards.includes(q.id)
  );

  const handleNext = () => {
    setShowAnswer(false);
    if (remainingCards.length > 1) {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % remainingCards.length);
    }
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    if (remainingCards.length > 1) {
      setPrevIndex(currentIndex);
      setCurrentIndex(
        (prev) => (prev - 1 + remainingCards.length) % remainingCards.length
      );
    }
  };

  const handleCorrect = () => {
    const currentCard = remainingCards[currentIndex];
    setCompletedCards([...completedCards, currentCard.id]);
    setShowAnswer(false);

    if (remainingCards.length > 1) {
      if (currentIndex >= remainingCards.length - 1) {
        setCurrentIndex(0);
      }
    }
  };

  const handleReset = () => {
    setCompletedCards([]);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const progress = (completedCards.length / questions.length) * 100;

  if (!content) {
    return <div>Content not found</div>;
  }

  if (remainingCards.length === 0) {
    return (
      <div className='min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/80'>
        <div className='max-w-md w-full space-y-8 text-center'>
          <div className='space-y-4 animate-fade-in'>
            <div className='relative inline-block'>
              <h2 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-300%'>
                Congratulations! 🎉
              </h2>
              <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-20 blur-lg animate-pulse' />
            </div>

            <p className='text-lg text-muted-foreground animate-fade-in-slow'>
              You've completed all the flashcards
            </p>

            <div
              className='pt-6 flex flex-col gap-4 animate-fade-in'
              style={{ animationDelay: "0.4s" }}
            >
              {/* Start Over Button */}
              <Button
                onClick={handleReset}
                className='relative w-full h-12 group overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg'
              >
                {/* Background gradient base */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#4461F2] to-[#A855F7] opacity-100' />

                {/* Glowing effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#4461F2]/40 to-[#FF1CF7]/40 blur-md group-hover:opacity-75 transition-opacity' />

                {/* Content container */}
                <div className='relative flex items-center justify-center w-full px-8 py-4 bg-white/95 dark:bg-[#151e2a]/95 backdrop-blur-sm rounded-xl'>
                  {/* Icon */}
                  <span className='mr-3 animate-spin-slow'>
                    <RotateCcw className='h-5 w-5 text-[#4461F2]' />
                  </span>

                  {/* Text */}
                  <span className='text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#4461F2] to-[#A855F7]'>
                    Start Over
                  </span>
                </div>

                {/* Gradient borders */}
                <div className='absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#4461F2] via-transparent to-[#A855F7]' />
                <div className='absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-[#4461F2] via-transparent to-[#A855F7]' />
              </Button>

              {/* Back to Menu Button */}
              <Button
                asChild
                className='relative w-full h-12 group overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg'
              >
                <Link
                  href={category === "banks" ? "/study/banks" : "/study/m&i400"}
                >
                  {/* Background gradient base */}
                  <div className='absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#4461F2] opacity-100' />

                  {/* Glowing effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-[#A855F7]/40 to-[#4461F2]/40 blur-md group-hover:opacity-75 transition-opacity' />

                  {/* Content container */}
                  <div className='relative flex items-center justify-center w-full px-8 py-4 bg-white/95 dark:bg-[#151e2a]/95 backdrop-blur-sm rounded-xl'>
                    {/* Icon */}
                    <span className='mr-3'>
                      <ChevronLeft className='h-5 w-5 text-[#A855F7]' />
                    </span>

                    {/* Text */}
                    <span className='text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#4461F2]'>
                      Back to Menu
                    </span>
                  </div>

                  {/* Gradient borders */}
                  <div className='absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#FF1CF7] via-transparent to-[#4461F2]' />
                  <div className='absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-[#FF1CF7] via-transparent to-[#4461F2]' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = remainingCards[currentIndex];
  const prevCard =
    remainingCards[
      (currentIndex - 1 + remainingCards.length) % remainingCards.length
    ];
  const nextCard = remainingCards[(currentIndex + 1) % remainingCards.length];

  return (
    <Tabs
      defaultValue='flashcards'
      className='w-full'
      onValueChange={handleTabChange}
    >
      <TabsList className='grid w-full grid-cols-3 h-auto gap-4 mb-8'>
        <TabsTrigger value='flashcards' className='flex flex-col py-4 gap-2'>
          <div className='w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center'>
            <LightbulbIcon className='w-6 h-6 text-blue-600 dark:text-blue-400' />
          </div>
          <span>Flashcards</span>
        </TabsTrigger>
        <TabsTrigger value='test' className='flex flex-col py-4 gap-2'>
          <div className='w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center'>
            <GraduationCap className='w-6 h-6 text-green-600 dark:text-green-400' />
          </div>
          <span>Test</span>
        </TabsTrigger>
        <TabsTrigger value='match' className='flex flex-col py-4 gap-2'>
          <div className='w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center'>
            <Zap className='w-6 h-6 text-orange-600 dark:text-orange-400' />
          </div>
          <span>Match</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value='flashcards'>
        <div className='min-h-[80vh] p-4 md:p-8'>
          <div className='max-w-6xl mx-auto space-y-8'>
            {/* Header Section */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <Button variant='ghost' asChild>
                  <Link
                    href={
                      category === "banks" ? "/study/banks" : "/study/m&i400"
                    }
                    className='flex items-center gap-2'
                  >
                    <ChevronLeft className='h-4 w-4' />
                    Back
                  </Link>
                </Button>
                <div>
                  <h2 className='font-semibold text-lg'>
                    {category === "banks"
                      ? "bank" in content
                        ? content.bank
                        : ""
                      : "category" in content
                      ? content.category
                      : ""}
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    {currentCard.type}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium'>
                  {completedCards.length} of {questions.length} completed
                </span>
                <Progress value={progress} className='w-32 h-2' />
              </div>
            </div>

            {/* Cards Section */}
            <div className='relative min-h-[500px] flex items-center justify-center'>
              {/* Previous Card */}
              {remainingCards.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 0.5, x: 0 }}
                  className='absolute left-0 w-80 h-[300px] -ml-18 cursor-pointer'
                  onClick={handlePrevious}
                >
                  <div className='bg-card text-card-foreground rounded-xl p-10 shadow-lg transform -rotate-6 h-full blur-[2px] hover:blur-none transition-all duration-300'>
                    <div className='text-base font-medium truncate'>
                      {prevCard.question}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Current Card */}
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentIndex}
                  initial={{
                    opacity: 0,
                    x: showAnswer ? 0 : currentIndex > prevIndex ? 300 : -300,
                    rotate: showAnswer ? 0 : currentIndex > prevIndex ? 6 : -6,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: currentIndex > prevIndex ? -300 : 300,
                    rotate: currentIndex > prevIndex ? -6 : 6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className='w-full max-w-xl z-10'
                  style={{ minHeight: showAnswer ? "600px" : "500px" }}
                >
                  <div className='bg-card text-card-foreground rounded-xl p-10 shadow-lg h-full relative'>
                    <div className='flex justify-between items-start mb-6'>
                      <Badge
                        variant={
                          currentCard.type === "Technical"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {currentCard.type}
                      </Badge>
                      <div className='flex items-center gap-4'>
                        {/* Font size slider */}
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-muted-foreground'>
                            Aa
                          </span>
                          <Slider
                            className='w-24'
                            min={12}
                            max={24}
                            step={1}
                            value={[fontSize]}
                            onValueChange={(value) => setFontSize(value[0])}
                          />
                          <span className='text-base text-muted-foreground'>
                            Aa
                          </span>
                        </div>
                        <Button variant='ghost' size='icon'>
                          <Volume2 className='h-4 w-4' />
                        </Button>
                        <Button variant='ghost' size='icon'>
                          <Bookmark className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                    <div
                      className='text-xl md:text-2xl font-medium mb-4'
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {currentCard.question}
                    </div>
                    <Button
                      variant='outline'
                      className='w-full'
                      onClick={() => setShowAnswer(!showAnswer)}
                    >
                      {showAnswer ? "Hide Answer" : "Show Answer"}
                    </Button>

                    {/* Controls Section */}
                    <motion.div
                      className='flex justify-center gap-4 mt-8'
                      animate={{ opacity: showAnswer ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        variant='destructive'
                        size='lg'
                        onClick={handleNext}
                        className='w-12 h-12 rounded-full p-0'
                      >
                        <X className='h-6 w-6' />
                      </Button>
                      <Button
                        variant='default'
                        size='lg'
                        onClick={handleCorrect}
                        className='w-12 h-12 rounded-full p-0 bg-green-500 hover:bg-green-600'
                      >
                        <Check className='h-6 w-6' />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Answer Card */}
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className='mt-4'
                      >
                        <div className='bg-card text-card-foreground rounded-xl p-10 shadow-lg'>
                          <div
                            className='text-xl md:text-2xl font-medium'
                            style={{ fontSize: `${fontSize}px` }}
                          >
                            {currentCard.answer}
                          </div>
                        </div>
                        <motion.div
                          className='flex justify-center gap-4 mt-4'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Button
                            variant='destructive'
                            size='lg'
                            onClick={handleNext}
                            className='w-12 h-12 rounded-full p-0'
                          >
                            <X className='h-6 w-6' />
                          </Button>
                          <Button
                            variant='default'
                            size='lg'
                            onClick={handleCorrect}
                            className='w-12 h-12 rounded-full p-0 bg-green-500 hover:bg-green-600'
                          >
                            <Check className='h-6 w-6' />
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {/* Next Card */}
              {remainingCards.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 0.5, x: 0 }}
                  className='absolute right-0 w-80 h-[300px] -mr-18 cursor-pointer'
                  onClick={handleNext}
                >
                  <div className='bg-card text-card-foreground rounded-xl p-10 shadow-lg transform rotate-6 h-full blur-[2px] hover:blur-none transition-all duration-300'>
                    <div className='text-base font-medium truncate'>
                      {nextCard.question}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value='test'>
        <ScrollArea className='h-[calc(100vh-200px)]'>
          {isTestMode && testSettings ? (
            <TestInterface
              settings={testSettings}
              questions={[
                {
                  id: 1,
                  type: "Technical",
                  question: "What is WACC?",
                  answer: "Weighted Average Cost of Capital",
                  completed: false,
                  bookmarked: false,
                },
                // ... (keep other sample questions)
              ]}
              onComplete={handleTestComplete}
            />
          ) : (
            <TestSetup maxQuestions={50} onStartTest={handleStartTest} />
          )}
        </ScrollArea>
      </TabsContent>

      <TabsContent value='match'>
        <MatchContent />
      </TabsContent>
    </Tabs>
  );
}
