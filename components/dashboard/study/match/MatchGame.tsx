"use client";

import React, { useState, useEffect } from "react";
import styles from "./match.module.css";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

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
  return (
    <div className={styles.matchGameIntro}>
      <div className={styles.gameIcon}>
        <div className={styles.matchIconGrid}>
          <div className={styles.matchIconCard}>Q</div>
          <div className={styles.matchIconCard}>A</div>
          <div className={styles.matchIconCard}>A</div>
          <div className={styles.matchIconCard}>Q</div>
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
      <button className={styles.startGameButton} onClick={onStartGame}>
        Start game
      </button>
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
        animate={{ opacity: 1, y: -30 }}
        exit={{ opacity: 0 }}
        className={styles.penaltyText}
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
        <div className={styles.exitButtonContainer}>
          <ExitButton onExit={handleExit} />
        </div>
        <Timer time={time} />
        <div className={styles.spacer}></div>
      </div>
      <div className={styles.matchGameGrid}>
        {shuffledCards.map((card) => (
          <motion.div
            key={card.id}
            className={`${styles.matchCard} 
              ${selectedCard?.id === card.id ? styles.selected : ""} 
              ${matchedPairs.includes(card.id) ? styles.matched : ""}
              ${wrongPair.includes(card.id) ? styles.wrong : ""}
              ${card.type === "blank" ? styles.blank : ""}`}
            onClick={() => handleCardClick(card)}
            animate={
              matchedPairs.includes(card.id) ? { scale: [1, 1.1, 1] } : {}
            }
            transition={{ duration: 0.3 }}
          >
            <div className={styles.cardContent}>
              {card.content}
              {wrongPair.includes(card.id) && card.id === lastClickedCard && (
                <PenaltyAnimation isVisible={showPenalty} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchGame;
