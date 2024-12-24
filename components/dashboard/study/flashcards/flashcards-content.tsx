"use client";

import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { useSpring, animated } from "@react-spring/web";

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
          question: "Walk me through a DCF for a SaaS company",
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
        {
          id: 4,
          type: "Technical",
          question: "What is WACC and how do you calculate it?",
          answer:
            "WACC (Weighted Average Cost of Capital):\n1. Formula: WACC = (E/V × Re) + (D/V × Rd × (1-T))\n2. E/V = Equity percentage of total financing\n3. D/V = Debt percentage of total financing\n4. Re = Cost of equity (usually calculated using CAPM)\n5. Rd = Cost of debt\n6. T = Tax rate",
          completed: false,
          bookmarked: false,
        },
        {
          id: 5,
          type: "Technical",
          question: "How do you calculate Unlevered Free Cash Flow?",
          answer:
            "Unlevered Free Cash Flow calculation:\n1. Start with EBIT\n2. Multiply by (1 - Tax Rate)\n3. Add back Depreciation & Amortization\n4. Subtract Changes in Working Capital\n5. Subtract Capital Expenditures\n6. Result = Unlevered Free Cash Flow",
          completed: false,
          bookmarked: false,
        },
        {
          id: 6,
          type: "Technical",
          question:
            "What are the key differences between enterprise and equity value?",
          answer:
            "Key differences:\n1. Enterprise Value includes debt, equity value doesn't\n2. EV subtracts cash, equity value includes it\n3. EV represents total business value, equity is just shareholders' portion\n4. EV used for operating metrics (EBITDA), equity for earnings metrics (P/E)\n5. EV includes other claims (preferred stock, minority interest)",
          completed: false,
          bookmarked: false,
        },
        {
          id: 7,
          type: "Technical",
          question: "Walk me through a leveraged buyout model",
          answer:
            "LBO model steps:\n1. Purchase Price and Capital Structure\n2. Project Operating Performance\n3. Model Debt Schedule and Interest\n4. Calculate Free Cash Flow and Debt Paydown\n5. Model Exit Value\n6. Calculate Returns (IRR, MOIC)",
          completed: false,
          bookmarked: false,
        },
        {
          id: 8,
          type: "Technical",
          question: "What makes a good LBO candidate?",
          answer:
            "Ideal LBO characteristics:\n1. Stable Cash Flows\n2. Strong Market Position\n3. Low Capital Expenditure Requirements\n4. Operational Improvement Opportunities\n5. Clear Exit Strategy\n6. Strong Asset Base for Debt Collateral",
          completed: false,
          bookmarked: false,
        },
        {
          id: 9,
          type: "Technical",
          question: "How do you calculate EBITDA?",
          answer:
            "EBITDA calculation:\n1. Start with Net Income\n2. Add back Interest Expense\n3. Add back Income Taxes\n4. Add back Depreciation\n5. Add back Amortization\n6. Adjust for one-time items if necessary",
          completed: false,
          bookmarked: false,
        },
        {
          id: 10,
          type: "Technical",
          question: "What are the three main valuation methodologies?",
          answer:
            "Three main methodologies:\n1. Comparable Company Analysis (Trading Comps)\n- Uses public company multiples\n- Most relevant peers\n2. Precedent Transactions Analysis\n- Uses M&A transaction multiples\n- Control premiums included\n3. Discounted Cash Flow (DCF)\n- Intrinsic value based on cash flows\n- Most theoretically sound",
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

const cardVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 1000 : -1000,
    scale: 0.95,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth animation
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -1000 : 1000,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const FancyButton = ({
  onClick,
  showAnswer,
}: {
  onClick: () => void;
  showAnswer: boolean;
}) => (
  <motion.div
    className="w-full mb-6 relative group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity animate-gradient-slow" />

    <Button
      variant="default"
      onClick={onClick}
      className={cn(
        "w-full relative",
        "bg-white dark:bg-background/50",
        "border-2 border-transparent",
        "rounded-xl h-12",
        "font-medium tracking-wide",
        "transition-all duration-300",
        "backdrop-blur-sm",
        "overflow-hidden",
        "text-gray-800 dark:text-gray-100",
        "hover:bg-white/90 dark:hover:bg-background/70",
        "group/button"
      )}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover/button:opacity-100 transition-opacity" />

      {/* Animated shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Text with icon */}
      <div className="relative flex items-center justify-center gap-2">
        <motion.div
          initial={false}
          animate={{ rotate: showAnswer ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-800 dark:text-gray-100"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
        <span className="relative">
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </span>
      </div>
    </Button>
  </motion.div>
);

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [direction, setDirection] = useState(0);

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
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % remainingCards.length);
    }
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    if (remainingCards.length > 1) {
      setPrevIndex(currentIndex);
      setDirection(-1);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        // Swiped left - go to next card
        handleNext();
      } else {
        // Swiped right - go to previous card
        handlePrevious();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
  };

  if (!content) {
    return <div>Content not found</div>;
  }

  if (remainingCards.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4 animate-fade-in">
            <div className="relative inline-block">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-300%">
                Congratulations! 🎉
              </h2>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-20 blur-lg animate-pulse" />
            </div>

            <p className="text-lg text-muted-foreground animate-fade-in-slow">
              You've completed all the flashcards
            </p>

            <div
              className="pt-6 flex flex-col gap-4 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Start Over Button */}
              <Button
                onClick={handleReset}
                className="relative w-full h-12 group overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg"
              >
                {/* Background gradient base */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4461F2] to-[#A855F7] opacity-100" />

                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4461F2]/40 to-[#FF1CF7]/40 blur-md group-hover:opacity-75 transition-opacity" />

                {/* Content container */}
                <div className="relative flex items-center justify-center w-full px-8 py-4 bg-white/95 dark:bg-[#151e2a]/95 backdrop-blur-sm rounded-xl">
                  {/* Icon */}
                  <span className="mr-3 animate-spin-slow">
                    <RotateCcw className="h-5 w-5 text-[#4461F2]" />
                  </span>

                  {/* Text */}
                  <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#4461F2] to-[#A855F7]">
                    Start Over
                  </span>
                </div>

                {/* Gradient borders */}
                <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#4461F2] via-transparent to-[#A855F7]" />
                <div className="absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-[#4461F2] via-transparent to-[#A855F7]" />
              </Button>

              {/* Back to Menu Button */}
              <Button
                asChild
                className="relative w-full h-12 group overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg"
              >
                <Link
                  href={category === "banks" ? "/study/banks" : "/study/m&i400"}
                >
                  {/* Background gradient base */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#4461F2] opacity-100" />

                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/40 to-[#4461F2]/40 blur-md group-hover:opacity-75 transition-opacity" />

                  {/* Content container */}
                  <div className="relative flex items-center justify-center w-full px-8 py-4 bg-white/95 dark:bg-[#151e2a]/95 backdrop-blur-sm rounded-xl">
                    {/* Icon */}
                    <span className="mr-3">
                      <ChevronLeft className="h-5 w-5 text-[#A855F7]" />
                    </span>

                    {/* Text */}
                    <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#4461F2]">
                      Back to Menu
                    </span>
                  </div>

                  {/* Gradient borders */}
                  <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#FF1CF7] via-transparent to-[#4461F2]" />
                  <div className="absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-[#FF1CF7] via-transparent to-[#4461F2]" />
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
      defaultValue="flashcards"
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="grid w-full grid-cols-3 h-auto gap-4 mb-8">
        <TabsTrigger value="flashcards" className="flex flex-col py-4 gap-2">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <LightbulbIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span>Flashcards</span>
        </TabsTrigger>
        <TabsTrigger value="test" className="flex flex-col py-4 gap-2">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <span>Test</span>
        </TabsTrigger>
        <TabsTrigger value="match" className="flex flex-col py-4 gap-2">
          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <span>Match</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="flashcards">
        <div className="min-h-[80vh] p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link
                    href={
                      category === "banks" ? "/study/banks" : "/study/m&i400"
                    }
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Link>
                </Button>
                <div>
                  <h2 className="font-semibold text-lg">
                    {category === "banks"
                      ? "bank" in content
                        ? content.bank
                        : ""
                      : "category" in content
                      ? content.category
                      : ""}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currentCard.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-sm font-medium whitespace-nowrap">
                  {completedCards.length} of {questions.length}
                </span>
                <Progress value={progress} className="w-32 h-2" />
              </div>
            </div>

            {/* Card Section */}
            <div
              className="relative min-h-[500px] overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative w-full max-w-3xl mx-auto absolute inset-0"
                >
                  <motion.div
                    className={cn(
                      "relative p-8 transition-colors duration-300",
                      "bg-card/80 dark:bg-card/80",
                      "border border-white/20 dark:border-white/10",
                      "shadow-xl",
                      "rounded-3xl",
                      "overflow-hidden"
                    )}
                  >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-slow opacity-50" />

                    {/* Content Container - Ensures content is above gradient */}
                    <div className="relative z-10">
                      {/* Card Controls */}
                      <div className="flex justify-between items-center mb-8">
                        <Badge
                          variant="outline"
                          className="bg-white/10 dark:bg-white/5 border-none px-4 py-1"
                        >
                          {currentCard.type}
                        </Badge>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Question Content */}
                      <motion.div
                        className="text-xl md:text-2xl font-medium mb-6"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {currentCard.question}
                      </motion.div>

                      {/* Replace the existing button with the new FancyButton component */}
                      <FancyButton
                        onClick={() => setShowAnswer(!showAnswer)}
                        showAnswer={showAnswer}
                      />

                      {/* Answer Section */}
                      <AnimatePresence>
                        {showAnswer && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: 20 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="prose dark:prose-invert max-w-none">
                              <div
                                className="text-lg md:text-xl"
                                style={{ fontSize: `${fontSize}px` }}
                              >
                                {currentCard.answer}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Navigation Controls */}
                  <div className="absolute -bottom-20 left-0 right-0 flex justify-between items-center px-4">
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      disabled={remainingCards.length <= 1}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    {/* Check/X Buttons */}
                    <div className="flex gap-4">
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={handleNext}
                        className="rounded-full w-12 h-12 p-0"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="default"
                        size="lg"
                        onClick={handleCorrect}
                        className="rounded-full w-12 h-12 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Check className="h-6 w-6" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      onClick={handleNext}
                      disabled={remainingCards.length <= 1}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Swipe Indicator */}
              {touchStart && touchEnd && (
                <div
                  className="absolute inset-y-0 left-0 w-full pointer-events-none"
                  style={{
                    background: `linear-gradient(to ${
                      touchStart - touchEnd > 0 ? "left" : "right"
                    }, rgba(59, 130, 246, 0), rgba(59, 130, 246, 0.1))`,
                    opacity: Math.min(
                      Math.abs(touchStart - touchEnd) / 200,
                      0.5
                    ),
                    transition: "opacity 0.2s ease",
                  }}
                />
              )}
            </div>

            {/* Font Size Controls */}
            <div className="flex justify-end items-center gap-4">
              <span className="text-sm text-muted-foreground">Text Size</span>
              <Slider
                className="w-32"
                min={12}
                max={24}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="test">
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isTestMode && testSettings ? (
            <TestInterface
              settings={testSettings}
              questions={questions}
              onComplete={handleTestComplete}
            />
          ) : (
            <TestSetup
              maxQuestions={questions.length}
              onStartTest={handleStartTest}
            />
          )}
        </ScrollArea>
      </TabsContent>

      <TabsContent value="match">
        <MatchContent />
      </TabsContent>
    </Tabs>
  );
}
