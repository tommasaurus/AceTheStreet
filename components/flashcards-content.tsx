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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

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
    [key: string]: BankContent;
  };
  "m-and-i": {
    [key: string]: CategoryContent;
  };
};

// Sample data - replace with your actual data
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
    "jpmorgan-1": {
      bank: "JP Morgan",
      questions: [
        {
          id: 1,
          type: "Technical",
          question: "How do you calculate WACC?",
          answer:
            "WACC Calculation:\n1. Cost of Equity (using CAPM)\n2. After-tax Cost of Debt\n3. Target Capital Structure Weights\n4. Weighted Average Calculation\n5. Consider Market Conditions",
          completed: false,
          bookmarked: false,
        },
        {
          id: 2,
          type: "Technical",
          question: "What's the difference between IPO and Direct Listing?",
          answer:
            "Key differences:\n1. New Shares: IPO issues new shares, Direct Listing doesn't\n2. Underwriting: IPO has underwriters, Direct Listing doesn't\n3. Price Discovery: IPO uses book building, Direct Listing uses market forces\n4. Lock-up: IPO typically has lock-up, Direct Listing may not\n5. Costs: IPO more expensive due to underwriting fees",
          completed: false,
          bookmarked: false,
        },
        {
          id: 3,
          type: "Behavioral",
          question: "What deals have you been following?",
          answer:
            "Structure response around:\n1. Recent Notable Transaction\n2. Strategic Rationale\n3. Deal Structure and Financing\n4. Market Impact\n5. Personal Interest in the Deal",
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
        {
          id: 2,
          type: "Technical",
          question: "What multiples would you use for different industries?",
          answer:
            "Industry-specific multiples:\n1. Tech: Revenue, EV/Sales, EV/Users\n2. Manufacturing: EV/EBITDA, P/E\n3. Real Estate: P/FFO, Price/Square Foot\n4. Retail: EV/EBITDAR, Sales/Square Foot\n5. Banks: P/B, P/E",
          completed: false,
          bookmarked: false,
        },
        {
          id: 3,
          type: "Technical",
          question: "How do you select comparable companies?",
          answer:
            "Selection criteria:\n1. Similar Business Model\n2. Comparable Size\n3. Same Geographic Markets\n4. Similar Growth and Margins\n5. Comparable Capital Structure",
          completed: false,
          bookmarked: false,
        },
      ],
    },
    "accounting-1": {
      category: "Accounting",
      questions: [
        {
          id: 1,
          type: "Technical",
          question:
            "Walk me through the impact of depreciation on financial statements",
          answer:
            "Impact across statements:\n1. Income Statement: Reduces EBIT\n2. Balance Sheet: Reduces PP&E, Retained Earnings\n3. Cash Flow: Added back in CFO\n4. No direct cash impact",
          completed: false,
          bookmarked: false,
        },
        {
          id: 2,
          type: "Technical",
          question: "What's the difference between LIFO and FIFO?",
          answer:
            "Key differences:\n1. Cost Flow Assumption\n2. Impact on COGS and Inventory Value\n3. Effect on Financial Ratios\n4. Tax Implications\n5. International Accounting Standards",
          completed: false,
          bookmarked: false,
        },
        {
          id: 3,
          type: "Technical",
          question: "How do operating leases differ from capital leases?",
          answer:
            "Main differences:\n1. Balance Sheet Treatment\n2. Income Statement Impact\n3. Cash Flow Classification\n4. Financial Ratios Effect\n5. New Lease Accounting Standards",
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

  const id = category === "banks" ? bankId : categoryId;
  const content = sampleQuestions[category][id as string];
  const questions = content?.questions || [];

  const remainingCards = questions.filter(
    (q) => !completedCards.includes(q.id)
  );

  const handleNext = () => {
    setShowAnswer(false);
    if (remainingCards.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % remainingCards.length);
    }
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    if (remainingCards.length > 1) {
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
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Congratulations! 🎉
          </h2>
          <p className="text-muted-foreground">
            You've completed all the flashcards.
          </p>
          <Button onClick={handleReset} className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
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
    <div className="min-h-[80vh] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link
                href={category === "banks" ? "/study/banks" : "/study/m&i400"}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <div>
              <h2 className="font-semibold text-lg">
                {category === "banks" ? content.bank : content.category}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentCard.type}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {completedCards.length} of {questions.length} completed
            </span>
            <Progress value={progress} className="w-32 h-2" />
          </div>
        </div>

        {/* Cards Section */}
        <div className="relative min-h-[500px] flex items-center justify-center">
          {/* Previous Card */}
          {remainingCards.length > 1 && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.5, x: 0 }}
              className="absolute left-0 w-80 h-[300px] -ml-18 cursor-pointer"
              onClick={handlePrevious}
            >
              <div className="bg-card text-card-foreground rounded-xl p-10 shadow-lg transform -rotate-6 h-full">
                <div className="text-base font-medium truncate">
                  {prevCard.question}
                </div>
              </div>
            </motion.div>
          )}

          {/* Current Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-xl"
              style={{ minHeight: showAnswer ? "600px" : "500px" }}
            >
              <div className="bg-card text-card-foreground rounded-xl p-10 shadow-lg h-full relative">
                <div className="flex justify-between items-start mb-6">
                  <Badge
                    variant={
                      currentCard.type === "Technical" ? "default" : "secondary"
                    }
                  >
                    {currentCard.type}
                  </Badge>
                  <div className="flex items-center gap-4">
                    {/* Font size slider */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Aa</span>
                      <Slider
                        className="w-24"
                        min={12}
                        max={24}
                        step={1}
                        value={[fontSize]}
                        onValueChange={(value) => setFontSize(value[0])}
                      />
                      <span className="text-base text-muted-foreground">
                        Aa
                      </span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div
                  className="text-xl md:text-2xl font-medium mb-4"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {currentCard.question}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </Button>

                {/* Controls Section */}
                <motion.div
                  className="flex justify-center gap-4 mt-8"
                  animate={{ opacity: showAnswer ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full p-0"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleCorrect}
                    className="w-12 h-12 rounded-full p-0 bg-green-500 hover:bg-green-600"
                  >
                    <Check className="h-6 w-6" />
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
                    className="mt-4"
                  >
                    <div className="bg-card text-card-foreground rounded-xl p-10 shadow-lg">
                      <div
                        className="text-xl md:text-2xl font-medium"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {currentCard.answer}
                      </div>
                    </div>
                    <motion.div
                      className="flex justify-center gap-4 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full p-0"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="default"
                        size="lg"
                        onClick={handleCorrect}
                        className="w-12 h-12 rounded-full p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Check className="h-6 w-6" />
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
              className="absolute right-0 w-80 h-[300px] -mr-18 cursor-pointer"
              onClick={handleNext}
            >
              <div className="bg-card text-card-foreground rounded-xl p-10 shadow-lg transform rotate-6 h-full">
                <div className="text-base font-medium truncate">
                  {nextCard.question}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
