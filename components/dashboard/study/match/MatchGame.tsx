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
          Match all the terms with their definitions
          <br />
          as fast as you can. Avoid wrong matches, they add extra time!
        </p>
      </div>

      <motion.button
        onClick={onStartGame}
        className={cn(
          "group relative w-full max-w-[280px] h-[52px]",
          "bg-gray-900/90 dark:bg-white/10",
          "backdrop-blur-sm",
          "rounded-xl",
          "border border-gray-800/50 dark:border-white/10",
          "transition-all duration-300 ease-out",
          "hover:bg-gray-900/95 dark:hover:bg-white/15",
          "hover:-translate-y-0.5",
          "hover:shadow-lg hover:shadow-gray-950/20 dark:hover:shadow-orange-500/10",
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
          <span className="text-[15px] font-medium text-white dark:text-white/90">
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
              className="w-4 h-4 text-white/70"
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

const GameComplete = ({
  time,
  onRestart,
}: {
  time: number;
  onRestart: () => void;
}) => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={styles.gameComplete}
    >
      <h2>Congratulations!</h2>
      <p>You completed the game in {(time / 1000).toFixed(1)} seconds</p>
      <button className={styles.startGameButton} onClick={onRestart}>
        Play Again
      </button>
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
    return <GameComplete time={time} onRestart={handleRestart} />;
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
