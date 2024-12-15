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
  Settings,
  Palette,
  Eye,
  Info,
  HelpCircle,
  Download,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BankFilter } from "@/components/bank-filter";
import { Slider } from "@/components/ui/slider";

// Sample data - replace with your actual data
const sampleQuestions = {
  banks: [
    {
      id: 1,
      question: "What is WACC and why is it important?",
      answer:
        "WACC (Weighted Average Cost of Capital) represents the average cost a company pays for capital, including both debt and equity. It's important because it's used as a hurdle rate for investment decisions and valuations.",
      difficulty: "Medium",
      category: "Valuation",
      bank: "gs",
    },
    {
      id: 2,
      question: "Walk me through a DCF.",
      answer:
        "A DCF (Discounted Cash Flow) analysis involves projecting future free cash flows and discounting them back to present value using WACC. Steps include: 1) Project future cash flows, 2) Calculate terminal value, 3) Discount all values to present, 4) Sum to get enterprise value.",
      difficulty: "Hard",
      category: "Valuation",
      bank: "ms",
    },
    {
      id: 3,
      question: "What happens to WACC when leverage increases?",
      answer:
        "As leverage increases, WACC typically decreases initially due to the tax benefits of debt and debt being cheaper than equity. However, at higher levels of leverage, WACC may increase due to higher financial risk and cost of both debt and equity.",
      difficulty: "Medium",
      category: "Capital Structure",
      bank: "jpm",
    },
  ],
  "m-and-i": [
    {
      id: 1,
      question: "Explain the concept of Enterprise Value.",
      answer:
        "Enterprise Value (EV) represents the total value of a company, calculated as market cap plus debt, minority interest and preferred shares, minus cash and cash equivalents. It's considered a more comprehensive measure of a company's total value than market capitalization.",
      difficulty: "Medium",
      category: "Valuation",
    },
    {
      id: 2,
      question:
        "What are the key differences between commercial and investment banking?",
      answer:
        "Commercial banking focuses on deposits, lending, and basic financial services for individuals and businesses. Investment banking focuses on capital markets activities, M&A advisory, securities underwriting, and complex financial transactions for corporations and institutions.",
      difficulty: "Easy",
      category: "Industry Overview",
    },
    {
      id: 3,
      question: "What is the difference between diluted and basic EPS?",
      answer:
        "Basic EPS only considers currently outstanding common shares, while diluted EPS includes all potential common shares that could be issued through conversion of convertible securities, exercise of stock options, and other dilutive instruments.",
      difficulty: "Medium",
      category: "Financial Metrics",
    },
  ],
};

export function FlashcardsContent({
  category,
}: {
  category: "banks" | "m-and-i";
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [selectedBank, setSelectedBank] = useState("all");
  const [fontSize, setFontSize] = useState(16);

  const questions = sampleQuestions[category];
  const remainingCards = questions.filter((q) => {
    if (category === "banks" && selectedBank !== "all") {
      return !completedCards.includes(q.id) && q.bank === selectedBank;
    }
    return !completedCards.includes(q.id);
  });

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
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">
                {category === "banks" ? "Investment Banking" : "M&I 400"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentCard.category}
              </p>
            </div>
            {category === "banks" && <BankFilter onSelect={setSelectedBank} />}
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
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    {currentCard.difficulty}
                  </span>
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
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.5, x: 0 }}
            className="absolute right-0 w-80 h-[300px] -mr-8 cursor-pointer"
            onClick={handleNext}
          >
            <div className="bg-card text-card-foreground rounded-xl p-10 shadow-lg transform rotate-6 h-full">
              <div className="text-base font-medium truncate">
                {nextCard.question}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
