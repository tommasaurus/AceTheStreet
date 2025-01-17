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
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import MatchContent from "@/components/dashboard/study/match/MatchContent";
import {
  TestSetup,
  TestSettings,
} from "@/components/dashboard/study/test/TestSetup";
import { TestInterface } from "@/components/dashboard/study/test/TestInterface";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSpring, animated } from "@react-spring/web";
import { StudyHeader } from "@/components/dashboard/study/study-header";
import { cva } from "class-variance-authority";
import { useTheme } from "next-themes";
import TabsList from "./tabslist";
import { Separator } from "@/components/ui/separator";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Question {
  id: string;
  type: string;
  question: string;
  answer: string;
  completed?: boolean;
  bookmarked?: boolean;
}

interface BankContent {
  bank: string;
  questions: Question[];
}

interface CategoryContent {
  category: string;
  questions: Question[];
}

type Content = BankContent | CategoryContent;

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
          id: "1",
          type: "Technical",
          question: "Walk me through a DCF for a SaaS company",
          answer:
            "Key components for a SaaS DCF:\n\n1. Revenue Growth: Focus on user growth and ARPU\n2. Margins: Consider R&D and S&M spend\n3. Working Capital: Usually minimal for SaaS\n4. Terminal Value: Use revenue or EBITDA multiples\n5. Discount Rate: Higher for early-stage companies",
          completed: false,
          bookmarked: false,
        },
        {
          id: "2",
          type: "Technical",
          question: "How would you value a pre-revenue startup?",
          answer:
            "Valuation approaches for pre-revenue startups:\n1. Comparable company analysis using alternative metrics\n2. Recent funding rounds and valuations\n3. Bottom-up market sizing and penetration\n4. Quality of team and IP\n5. Strategic value to potential acquirers",
          completed: false,
          bookmarked: false,
        },
        {
          id: "3",
          type: "Technical",
          question: "What's the impact of increasing depreciation by $10?",
          answer:
            "Impact of $10 increase in depreciation:\n1. Income Statement: EBIT decreases by $10, Net Income decreases by $10*(1-tax rate)\n2. Balance Sheet: Accumulated depreciation increases by $10\n3. Cash Flow: No impact on cash flow, add back to get FCFF\n4. Valuation: No direct impact on enterprise value",
          completed: false,
          bookmarked: false,
        },
        {
          id: "4",
          type: "Technical",
          question: "What is WACC and how do you calculate it?",
          answer:
            "WACC (Weighted Average Cost of Capital):\n1. Formula: WACC = (E/V × Re) + (D/V × Rd × (1-T))\n2. E/V = Equity percentage of total financing\n3. D/V = Debt percentage of total financing\n4. Re = Cost of equity (usually calculated using CAPM)\n5. Rd = Cost of debt\n6. T = Tax rate",
          completed: false,
          bookmarked: false,
        },
        {
          id: "5",
          type: "Technical",
          question: "How do you calculate Unlevered Free Cash Flow?",
          answer:
            "Unlevered Free Cash Flow calculation:\n1. Start with EBIT\n2. Multiply by (1 - Tax Rate)\n3. Add back Depreciation & Amortization\n4. Subtract Changes in Working Capital\n5. Subtract Capital Expenditures\n6. Result = Unlevered Free Cash Flow",
          completed: false,
          bookmarked: false,
        },
        {
          id: "6",
          type: "Technical",
          question:
            "What are the key differences between enterprise and equity value?",
          answer:
            "Key differences:\n1. Enterprise Value includes debt, equity value doesn't\n2. EV subtracts cash, equity value includes it\n3. EV represents total business value, equity is just shareholders' portion\n4. EV used for operating metrics (EBITDA), equity for earnings metrics (P/E)\n5. EV includes other claims (preferred stock, minority interest)",
          completed: false,
          bookmarked: false,
        },
        {
          id: "7",
          type: "Technical",
          question: "Walk me through a leveraged buyout model",
          answer:
            "LBO model steps:\n1. Purchase Price and Capital Structure\n2. Project Operating Performance\n3. Model Debt Schedule and Interest\n4. Calculate Free Cash Flow and Debt Paydown\n5. Model Exit Value\n6. Calculate Returns (IRR, MOIC)",
          completed: false,
          bookmarked: false,
        },
        {
          id: "8",
          type: "Technical",
          question: "What makes a good LBO candidate?",
          answer:
            "Ideal LBO characteristics:\n1. Stable Cash Flows\n2. Strong Market Position\n3. Low Capital Expenditure Requirements\n4. Operational Improvement Opportunities\n5. Clear Exit Strategy\n6. Strong Asset Base for Debt Collateral",
          completed: false,
          bookmarked: false,
        },
        {
          id: "9",
          type: "Technical",
          question: "How do you calculate EBITDA?",
          answer:
            "EBITDA calculation:\n1. Start with Net Income\n2. Add back Interest Expense\n3. Add back Income Taxes\n4. Add back Depreciation\n5. Add back Amortization\n6. Adjust for one-time items if necessary",
          completed: false,
          bookmarked: false,
        },
        {
          id: "10",
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
          id: "1",
          type: "Technical",
          question: "Walk me through a leveraged buyout model",
          answer:
            "Key LBO components:\n1. Purchase Price and Capital Structure\n2. Debt Schedule and Interest Expense\n3. Operational Projections\n4. Cash Flow Available for Debt Paydown\n5. Exit Multiple and Returns Analysis",
          completed: false,
          bookmarked: false,
        },
        {
          id: "2",
          type: "Technical",
          question: "What makes a good LBO candidate?",
          answer:
            "Ideal LBO characteristics:\n1. Stable Cash Flows\n2. Strong Market Position\n3. Low Capital Expenditure Requirements\n4. Operational Improvement Opportunities\n5. Clear Exit Strategy",
          completed: false,
          bookmarked: false,
        },
        {
          id: "3",
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
          id: "1",
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
      ease: [0.22, 1, 0.36, 1],
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
    <Button
      variant="default"
      onClick={onClick}
      className={cn(
        "w-full relative",
        "bg-[#ECECEC] dark:bg-[#1c2936]",
        "border-none",
        "rounded-2xl h-12",
        "font-medium tracking-wide",
        "transition-all duration-300",
        "overflow-hidden",
        "text-gray-800 dark:text-gray-100",
        "hover:bg-[#E5E5E5] dark:hover:bg-[#243442]",
        "group/button"
      )}
    >
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

// Update the TextSizeControl component
const TextSizeControl = ({
  fontSize,
  setFontSize,
}: {
  fontSize: number;
  setFontSize: (size: number) => void;
}) => (
  <motion.div
    className="relative group flex items-center bg-white/10 dark:bg-white/5 rounded-full px-3 py-1.5"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-2">
      <button
        onClick={() => setFontSize(Math.max(12, fontSize - 2))}
        className="text-sm opacity-60 hover:opacity-100 transition-opacity"
      >
        A
      </button>
      <div className="h-3 w-px bg-gray-400/20" />
      <button
        onClick={() => setFontSize(Math.min(24, fontSize + 2))}
        className="text-lg font-medium opacity-60 hover:opacity-100 transition-opacity"
      >
        A
      </button>
    </div>

    {/* Tooltip */}
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Adjust text size
    </span>
  </motion.div>
);

// Add this new component for the action buttons
const ActionButton = ({
  icon: Icon,
  onClick,
  variant = "default",
  label,
}: {
  icon: any;
  onClick: () => void;
  variant?: "success" | "error" | "default";
  label: string;
}) => {
  const colors = {
    success:
      "from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700",
    error: "from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700",
    default:
      "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-40 transition-opacity",
          variant === "success" && "bg-green-500/50",
          variant === "error" && "bg-red-500/50"
        )}
      />

      <motion.button
        onClick={onClick}
        className={cn(
          "relative w-14 h-14 rounded-full flex items-center justify-center",
          "bg-gradient-to-br",
          colors[variant],
          "shadow-lg",
          "border border-white/10",
          "transition-all duration-300 ease-out",
          "group"
        )}
        whileHover={{ y: -2 }}
      >
        {/* Inner gradient overlay */}
        <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Icon container */}
        <div className="relative z-10">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Tooltip */}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {label}
        </span>
      </motion.button>
    </motion.div>
  );
};

// Add this new component for the icon buttons
const IconButton = ({
  icon: Icon,
  onClick,
  label,
}: {
  icon: any;
  onClick?: () => void;
  label: string;
}) => (
  <motion.div className="relative group">
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="rounded-full hover:bg-white/10 dark:hover:bg-white/5"
    >
      <Icon className="w-4 h-4" />
    </Button>
    {/* Tooltip */}
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);

// Add this new component for navigation buttons
const NavigationButton = ({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) => (
  <motion.div
    whileHover={{ x: direction === "left" ? -3 : 3, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "relative group",
      disabled && "opacity-50 pointer-events-none"
    )}
  >
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 rounded-2xl",
        "bg-[#ECECEC] dark:bg-[#1c2936]",
        "hover:bg-[#E5E5E5] dark:hover:bg-[#243442]",
        "border-none",
        "transition-all duration-300",
        "group/button"
      )}
    >
      <div className="relative flex items-center gap-2">
        {direction === "left" && (
          <motion.div
            initial={false}
            animate={{ x: [-2, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
        )}
        <span className="relative font-medium">{label}</span>
        {direction === "right" && (
          <motion.div
            initial={false}
            animate={{ x: [0, 2] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        )}
      </div>
    </Button>
  </motion.div>
);

// Add this new component for the tab icon animation
const TabIcon = ({
  icon: Icon,
  isActive,
  color,
}: {
  icon: any;
  isActive: boolean;
  color: string;
}) => (
  <motion.div
    className={cn(
      "relative w-10 h-10 rounded-xl flex items-center justify-center",
      "transition-all duration-500"
    )}
    animate={{
      backgroundColor: isActive ? `rgb(${color} / 0.15)` : "transparent",
    }}
  >
    <motion.div
      className="absolute inset-0 rounded-xl"
      animate={{
        boxShadow: isActive ? `0 0 25px 5px rgb(${color} / 0.15)` : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
    <Icon
      className={cn(
        "w-5 h-5 transition-all duration-300",
        isActive ? `text-[rgb(${color})]` : "text-muted-foreground/70"
      )}
    />
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 rounded-xl"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        <div className="absolute inset-0 rounded-xl border-2 border-[rgb(${color})] opacity-40" />
      </motion.div>
    )}
  </motion.div>
);

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-[50%] -translate-x-[50%] mt-16 flex flex-col items-center gap-2 whitespace-nowrap"
    >
      <span className="text-sm text-muted-foreground/80">
        Scroll to see all cards
      </span>
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="absolute -inset-2 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-full blur-md" />
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </motion.div>
  );
};

export function FlashcardsContent({
  category,
  bankId,
  categoryId,
}: FlashcardsContentProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCards, setCompletedCards] = useState<string[]>([]);
  const [bookmarkedCards, setBookmarkedCards] = useState<string[]>([]);
  const [bankName, setBankName] = useState("");
  const supabase = createClientComponentClient();
  const [fontSize, setFontSize] = useState(16); // Default to 16
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTestMode, setIsTestMode] = useState(false);
  const [testSettings, setTestSettings] = useState<TestSettings | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [direction, setDirection] = useState(0);
  const [activeTab, setActiveTab] = useState("flashcards");
  const [hasScrolled, setHasScrolled] = useState(false);

  // Add useEffect for localStorage
  useEffect(() => {
    // Only access localStorage on client side
    const saved = localStorage.getItem("flashcards-font-size");
    if (saved) {
      setFontSize(parseInt(saved));
    }
  }, []);

  // Fetch questions and bank info
  useEffect(() => {
    async function fetchQuestions() {
      try {
        if (category === "banks" && bankId) {
          // First get the bank name and id
          const { data: bankData, error: bankError } = await supabase
            .from("banks")
            .select("id, name")
            .eq("slug", bankId)
            .single();

          if (bankError) {
            console.error("Error fetching bank:", bankError);
            return;
          }

          if (!bankData) {
            console.error("No bank found with slug:", bankId);
            return;
          }

          setBankName(bankData.name);

          // Then get the questions for this bank
          const { data: questionsData, error: questionsError } = await supabase
            .from("questions")
            .select("*")
            .eq("bank_id", bankData.id);

          if (questionsError) {
            console.error("Error fetching questions:", questionsError);
            return;
          }

          // Add client-side tracking properties
          const questionsWithTracking = questionsData.map((q: Question) => ({
            ...q,
            completed: false,
            bookmarked: false,
          }));

          setQuestions(questionsWithTracking);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [category, bankId, supabase]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  // No content found state
  if (!questions.length) {
    return <div>No questions found</div>;
  }

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

  // Helper function to get the title
  const getTitle = () => {
    return bankName || "Questions";
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cardId = currentCard.id;
    setBookmarkedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  // Create a function to handle font size changes
  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
    localStorage.setItem("flashcards-font-size", value.toString());
  };

  // Add back the handlers
  const handleStartTest = (settings: TestSettings) => {
    if (
      !settings.questionTypes.trueFalse &&
      !settings.questionTypes.multipleChoice
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
    setActiveTab(value);
  };

  if (!questions.length) {
    return <div>Content not found</div>;
  }

  if (remainingCards.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/80">
        <div className="w-full space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="relative mx-auto w-fit">
              <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-300%">
                Congratulations!
              </h2>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-20 blur-lg animate-pulse" />
            </div>

            <p className="text-2xl text-muted-foreground">
              You've completed all the flashcards 🎉
            </p>

            <motion.div
              className="pt-6 flex flex-col gap-4 max-w-[260px] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            >
              {/* Start Over Button */}
              <Button
                onClick={handleReset}
                className={cn(
                  "relative h-12 overflow-hidden rounded-full",
                  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                  "text-white font-medium text-lg"
                )}
              >
                <div className="relative flex items-center justify-center gap-2">
                  <RotateCcw className="h-5 w-5 animate-spin-slow" />
                  <span>Start Over</span>
                </div>
              </Button>

              {/* Back to Menu Button */}
              <Button
                asChild
                className={cn(
                  "relative h-12 overflow-hidden rounded-full",
                  "bg-gray-900/10 dark:bg-white/20 backdrop-blur-md",
                  "border border-gray-900/20 dark:border-white/10",
                  "text-gray-900 dark:text-white font-medium text-lg",
                  "[&:hover]:bg-gray-900/10 dark:[&:hover]:bg-white/20 [&:hover]:opacity-100"
                )}
              >
                <Link
                  href={category === "banks" ? "/study/banks" : "/study/m&i400"}
                  className="hover:no-underline"
                >
                  <div className="relative flex items-center justify-center gap-2">
                    <ChevronLeft className="h-5 w-5" />
                    <span>Back to Menu</span>
                  </div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
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
    <div className="min-h-screen">
      <div className="flex items-center gap-2 mb-12 pl-2">
        <div className="pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
            className="text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <h1 className="text-3xl font-semibold pt-4">{getTitle()}</h1>
      </div>

      <div className="w-full">
        <div className="relative px-6 mb-4">
          <TabsList activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        <div className="p-4 md:p-6">
          {activeTab === "flashcards" && (
            <div className="max-w-6xl mx-auto">
              <div className="relative max-w-3xl mx-auto mb-32">
                {/* Progress Bar */}
                <div className="mb-6 flex flex-col gap-2 px-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-sm font-medium">
                      {completedCards.length + 1} / {questions.length}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 dark:bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                      style={{
                        width: `${
                          ((completedCards.length + 1) / questions.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Flashcard Container */}
                <div
                  className="relative"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence
                    mode="wait"
                    custom={direction}
                    initial={false}
                  >
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="relative"
                    >
                      <motion.div
                        className={cn(
                          "relative p-8 transition-colors duration-300",
                          "bg-[#ECECEC] dark:bg-[#1c2936]",
                          "border-none",
                          "shadow-lg",
                          "rounded-3xl",
                          "overflow-hidden",
                          "mb-8",
                          "cursor-pointer"
                        )}
                        onClick={() => setShowAnswer(!showAnswer)}
                      >
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-4">
                            <Badge
                              variant="outline"
                              className="bg-[#E5E5E5] dark:bg-[#243442] border-none px-4 py-1.5 text-sm"
                            >
                              {currentCard.type}
                            </Badge>
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-3"
                            >
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
                                <button
                                  onClick={toggleBookmark}
                                  className="relative p-1.5 sm:p-2.5 rounded-full"
                                >
                                  <Bookmark
                                    className={cn(
                                      "h-5 w-5 sm:h-7 sm:w-7 transition-colors duration-200",
                                      "stroke-[1.5]",
                                      bookmarkedCards.includes(currentCard.id)
                                        ? "fill-foreground text-foreground"
                                        : "fill-transparent text-muted-foreground"
                                    )}
                                  />
                                  <span className="sr-only">Bookmark card</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div
                            className="text-3xl font-medium mb-4 text-gray-800 dark:text-gray-100"
                            style={{ fontSize: `${fontSize}px` }}
                          >
                            {currentCard.question}
                          </div>

                          <div className="flex items-center mb-4">
                            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                              {showAnswer ? "Hide Answer" : "Show Answer"}
                            </span>
                          </div>

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
                                    className="text-2xl text-gray-700 dark:text-gray-300"
                                    style={{ fontSize: `${fontSize}px` }}
                                  >
                                    {currentCard.answer
                                      ?.split("\n\n")
                                      .map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                      )) ?? "No answer provided"}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>

                      <div className="flex flex-col items-center">
                        {/* Action Buttons */}
                        <div className="flex justify-center items-center px-4 mb-8">
                          <div className="relative flex items-center gap-8">
                            <NavigationButton
                              direction="left"
                              onClick={handlePrevious}
                              disabled={remainingCards.length <= 1}
                              label="Previous"
                            />

                            <div className="flex gap-6 scale-110 relative">
                              <ActionButton
                                icon={X}
                                onClick={handleNext}
                                variant="error"
                                label="Skip"
                              />
                              <ActionButton
                                icon={Check}
                                onClick={handleCorrect}
                                variant="success"
                                label="Got it!"
                              />

                              {/* Keep only this Scroll Indicator */}
                              <AnimatePresence mode="wait">
                                {!hasScrolled && (
                                  <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                                    style={{
                                      top: "calc(100% + 48px)",
                                    }}
                                  >
                                    <span className="text-sm text-muted-foreground/80">
                                      Scroll to see all cards
                                    </span>
                                    <motion.div
                                      animate={{
                                        y: [0, 8, 0],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                      className="flex justify-center mt-2"
                                    >
                                      <div className="relative">
                                        <div className="absolute -inset-2 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-full blur-md" />
                                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                      </div>
                                    </motion.div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <NavigationButton
                              direction="right"
                              onClick={handleNext}
                              disabled={remainingCards.length <= 1}
                              label="Next"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

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
              </div>

              {/* Question List Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mt-24 pt-16"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, var(--background), transparent 50%)",
                    height: "100px",
                    top: "-50px",
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex items-center justify-between mb-12"
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold">All Questions</h2>
                    <Badge variant="outline" className="px-4 py-1.5">
                      {questions.length} Questions
                    </Badge>
                  </div>

                  <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
                </motion.div>

                <div className="grid gap-4">
                  {questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="group"
                    >
                      <div
                        className={cn(
                          "relative p-6 transition-all duration-300",
                          "bg-[#ECECEC] dark:bg-[#1c2936]",
                          "rounded-2xl",
                          "hover:bg-[#E5E5E5] dark:hover:bg-[#243442]",
                          "transform-gpu hover:scale-[1.02]",
                          "hover:shadow-lg",
                          "border border-transparent",
                          "hover:border-blue-500/20 dark:hover:border-blue-400/20"
                        )}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <Badge
                              variant="outline"
                              className="bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                            >
                              {question.type}
                            </Badge>
                            <div className="flex items-center gap-2">
                              {completedCards.includes(question.id) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="text-green-500"
                                >
                                  <Check className="h-5 w-5" />
                                </motion.div>
                              )}
                              {bookmarkedCards.includes(question.id) && (
                                <Bookmark className="h-5 w-5 fill-foreground" />
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-lg font-medium text-foreground">
                              {question.question}
                            </h3>
                            <div
                              className={cn(
                                "prose prose-sm dark:prose-invert max-w-none",
                                "text-muted-foreground",
                                "transition-all duration-300",
                                "overflow-hidden"
                              )}
                            >
                              {question.answer
                                ?.split("\n\n")
                                .map((paragraph, i) => (
                                  <p key={i}>{paragraph}</p>
                                )) ?? "No answer provided"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "test" && (
            <div className="w-full">
              {isTestMode && testSettings ? (
                <TestInterface
                  settings={testSettings}
                  questions={questions}
                  onComplete={handleTestComplete}
                />
              ) : (
                <div className="max-w-3xl mx-auto">
                  <TestSetup
                    maxQuestions={questions.length}
                    onStartTest={handleStartTest}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "match" && <MatchContent />}
        </div>
      </div>
    </div>
  );
}
