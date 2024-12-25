"use client";

import React, { useState, useEffect } from "react";
import styles from "./match.module.css";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  answer: string;
}

interface Card {
  id: string;
  content: string;
  type: "question" | "answer" | "blank";
}

interface MatchGameProps {
  questions: Question[];
}

const MatchGameIntro = ({ onStartGame }: { onStartGame: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className={styles.matchGameIntro}>
      <div className={styles.gameIcon}>
        <div
          className={`${styles.matchIconGrid} ${
            isLoaded ? styles.animate : ""
          }`}
        >
          <div className={styles.matchIconCard} data-letter="Q">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.matchIconCard} data-letter="A">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.matchIconCard} data-letter="A">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.matchIconCard} data-letter="Q">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className={styles.introText}>
        <h1 className={styles.readyText}>Ready to play?</h1>
        <p className={styles.gameDescription}>
          Match all the terms with their definitions as fast as you can. Avoid
          wrong matches, they add extra time!
        </p>
      </div>

      <motion.button
        onClick={onStartGame}
        className={cn(
          "group relative w-full max-w-[280px] h-[52px]",
          "bg-gray-900/90 dark:bg-white/90",
          "backdrop-blur-sm",
          "rounded-xl",
          "border border-gray-800/50 dark:border-white/20",
          "transition-all duration-300 ease-out",
          "hover:bg-gray-900/95 dark:hover:bg-white/95",
          "hover:-translate-y-0.5",
          "hover:shadow-lg hover:shadow-gray-950/20 dark:hover:shadow-white/20",
          "active:translate-y-0",
          "focus:outline-none focus:ring-2 focus:ring-gray-800/30 dark:focus:ring-orange-500/30",
          "focus:ring-offset-2 dark:focus:ring-offset-[#151e2a]"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Content wrapper */}
        <div className="relative flex items-center justify-center gap-3">
          {/* Text with subtle gradient */}
          <span
            className={cn(
              "text-[15px] font-medium",
              "text-white dark:text-gray-900"
            )}
          >
            Start Game
          </span>

          {/* Minimal arrow */}
          <motion.div
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-4 h-4 text-white/70 dark:text-gray-900/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12h16" />
              <path d="m15 5 7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};

const MatchGameComplete = ({
  time,
  onPlayAgain,
}: {
  time: number;
  onPlayAgain: () => void;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Celebration animation wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* Animated rings */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-orange-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-orange-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        {/* Main heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent pb-1"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          Congratulations!
        </motion.h1>
      </motion.div>

      {/* Time display */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <span className="text-lg text-gray-600 dark:text-gray-300">
          You completed the game in
        </span>
        <motion.span
          className="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.6 }}
        >
          {(time / 1000).toFixed(1)} seconds
        </motion.span>
      </motion.div>

      {/* Play Again button */}
      <motion.button
        onClick={onPlayAgain}
        className={cn(
          "relative group px-8 py-3 mt-4",
          "bg-gray-900 dark:bg-white",
          "hover:bg-gray-800 dark:hover:bg-gray-50",
          "rounded-xl",
          "transition-all duration-300",
          "hover:-translate-y-0.5",
          "hover:shadow-lg hover:shadow-gray-950/20 dark:hover:shadow-white/20"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Button content */}
        <div className="flex items-center gap-2">
          <span className="text-white dark:text-gray-900 font-medium">
            Play Again
          </span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              className="w-4 h-4 text-white/70 dark:text-gray-900/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12h16" />
              <path d="m15 5 7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
};

const Timer = ({ time }: { time: number }) => (
  <div className={styles.timer}>{(time / 1000).toFixed(1)}s</div>
);

const PenaltyAnimation = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: -30,
          scale: [1, 1.2, 1.2, 1],
        }}
        transition={{
          duration: 1,
          times: [0, 0.2, 0.8, 1],
        }}
        className={cn(
          styles.penaltyText,
          "font-bold text-red-500 dark:text-red-400"
        )}
      >
        +2s
      </motion.div>
    )}
  </AnimatePresence>
);

const ExitButton = ({ onExit }: { onExit: () => void }) => (
  <button onClick={onExit} className={styles.exitButton}>
    Exit
  </button>
);

const MatchGame: React.FC<MatchGameProps> = ({ questions }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  const [showPenalty, setShowPenalty] = useState(false);
  const [lastClickedCard, setLastClickedCard] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !isComplete) {
      interval = setInterval(() => {
        setTime((prev) => prev + 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameStarted, isComplete]);

  useEffect(() => {
    if (gameStarted) {
      const pairs = questions
        .map((q, index) => [
          { id: `q${index}`, content: q.question, type: "question" as const },
          { id: `a${index}`, content: q.answer, type: "answer" as const },
        ])
        .flat();

      const blanksNeeded = Math.max(0, 16 - pairs.length);
      const blankCards: Card[] = Array.from(
        { length: blanksNeeded },
        (_, i) => ({
          id: `blank${i}`,
          content: "",
          type: "blank" as const,
        })
      );

      setShuffledCards(
        [...pairs, ...blankCards].sort(() => Math.random() - 0.5)
      );
    }
  }, [gameStarted, questions]);

  useEffect(() => {
    if (
      matchedPairs.length > 0 &&
      matchedPairs.length === questions.length * 2 // Each question has 2 cards
    ) {
      setIsComplete(true);
    }
  }, [matchedPairs, questions.length]);

  useEffect(() => {
    setGameStarted(false);
    setIsComplete(false);
    setMatchedPairs([]);
    setSelectedCard(null);
    setTime(0);
    setWrongPair([]);
    setIsProcessing(false);
  }, [questions]);

  const handleCardClick = (card: Card) => {
    if (isProcessing || card.type === "blank") return;
    if (matchedPairs.includes(card.id) || wrongPair.includes(card.id)) return;

    if (!selectedCard) {
      setSelectedCard(card);
      return;
    }

    if (selectedCard.id === card.id) {
      setSelectedCard(null);
      return;
    }

    const isMatch =
      selectedCard.id.slice(1) === card.id.slice(1) &&
      selectedCard.type !== card.type;

    if (isMatch) {
      setMatchedPairs([...matchedPairs, selectedCard.id, card.id]);
      setSelectedCard(null);
    } else {
      setIsProcessing(true);
      setTime((prev) => prev + 2000);
      setWrongPair([selectedCard.id, card.id]);
      setShowPenalty(true);
      setLastClickedCard(card.id);
      setTimeout(() => {
        setShowPenalty(false);
        setLastClickedCard(null);
      }, 1000);
      setTimeout(() => {
        setWrongPair([]);
        setSelectedCard(null);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const handleRestart = () => {
    setGameStarted(true);
    setIsComplete(false);
    setMatchedPairs([]);
    setSelectedCard(null);
    setTime(0);
    setWrongPair([]);
  };

  const handleExit = () => {
    setGameStarted(false);
    setIsComplete(false);
    setMatchedPairs([]);
    setSelectedCard(null);
    setTime(0);
    setWrongPair([]);
  };

  if (!gameStarted) {
    return <MatchGameIntro onStartGame={() => setGameStarted(true)} />;
  }

  if (isComplete) {
    return <MatchGameComplete time={time} onPlayAgain={handleRestart} />;
  }

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <div className="relative w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-background/80 to-background rounded-2xl border border-border/50 backdrop-blur-sm">
          <div className={styles.exitButtonContainer}>
            <Button
              onClick={handleExit}
              variant="ghost"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground mb-1">Time</span>
            <motion.div
              className={cn(
                "text-3xl font-bold bg-clip-text text-transparent",
                "bg-gradient-to-r from-orange-500 to-orange-600"
              )}
              animate={{ scale: showPenalty ? [1, 1.1, 1] : 1 }}
            >
              {(time / 1000).toFixed(1)}s
            </motion.div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground mb-1">Matched</span>
            <span className="font-semibold">
              {matchedPairs.length / 2} / {questions.length}
            </span>
          </div>
        </div>
      </div>

      <div
        className={cn(
          styles.matchGameGrid,
          "relative p-8 rounded-2xl",
          "bg-gradient-to-b from-background/50 to-background/30",
          "border border-border/50 backdrop-blur-sm"
        )}
      >
        {shuffledCards.map((card) => (
          <motion.div
            key={card.id}
            className={cn(
              styles.matchCard,
              "relative overflow-hidden",
              "bg-card/95 dark:bg-card/95",
              "border border-border/50",
              "shadow-sm hover:shadow-md",
              "transition-all duration-300",
              selectedCard?.id === card.id && "ring-2 ring-orange-500/50",
              matchedPairs.includes(card.id) &&
                "ring-2 ring-green-500/50 bg-green-500/5",
              wrongPair.includes(card.id) &&
                "ring-2 ring-red-500/50 bg-red-500/5",
              card.type === "blank" && "opacity-0 pointer-events-none"
            )}
            onClick={() => handleCardClick(card)}
            whileHover={{ scale: card.type !== "blank" ? 1.02 : 1 }}
            animate={
              matchedPairs.includes(card.id)
                ? {
                    scale: [1, 1.05, 1],
                    transition: { duration: 0.5 },
                  }
                : {}
            }
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent opacity-50" />

            <div
              className={cn(
                styles.cardContent,
                "relative z-10 p-4",
                "text-sm md:text-base font-medium",
                "transition-colors duration-300"
              )}
            >
              {card.content}
              {wrongPair.includes(card.id) && card.id === lastClickedCard && (
                <PenaltyAnimation isVisible={showPenalty} />
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchGame;
