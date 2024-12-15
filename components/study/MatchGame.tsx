"use client";

import React, { useState, useEffect } from "react";
import MatchGameIntro from "./MatchGameIntro";
import styles from "./MatchGame.module.css";

interface Question {
  question: string;
  answer: string;
}

interface Card {
  id: string;
  content: string;
  type: "question" | "answer";
}

interface MatchGameProps {
  questions: Question[];
}

const MatchGame = ({ questions }: MatchGameProps) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);

  useEffect(() => {
    if (gameStarted) {
      const pairs = questions
        .map((q, index) => [
          { id: `q${index}`, content: q.question, type: "question" },
          { id: `a${index}`, content: q.answer, type: "answer" },
        ])
        .flat();

      setShuffledCards([...pairs].sort(() => Math.random() - 0.5));
    }
  }, [gameStarted, questions]);

  const handleCardClick = (card: Card) => {
    if (matchedPairs.includes(card.id)) return;

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
    } else {
      setTimeout(() => {
        setSelectedCard(null);
      }, 1000);
    }
  };

  if (!gameStarted) {
    return <MatchGameIntro onStartGame={() => setGameStarted(true)} />;
  }

  return (
    <div className={styles.matchGameGrid}>
      {shuffledCards.map((card) => (
        <div
          key={card.id}
          className={`${styles.matchCard} ${
            selectedCard?.id === card.id ? styles.selected : ""
          } ${matchedPairs.includes(card.id) ? styles.matched : ""}`}
          onClick={() => handleCardClick(card)}
        >
          {card.content}
        </div>
      ))}
    </div>
  );
};

export default MatchGame;
