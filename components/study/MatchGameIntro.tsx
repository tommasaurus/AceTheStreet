import React from "react";
import styles from "./MatchGame.module.css";

interface MatchGameIntroProps {
  onStartGame: () => void;
}

const MatchGameIntro = ({ onStartGame }: MatchGameIntroProps) => {
  return (
    <div className={styles.matchGameIntro}>
      <div className={styles.matchGameLogo}>
        {/* Add your 4-square logo here */}
      </div>
      <h2>Ready to play?</h2>
      <p>
        Match all the terms with their definitions as fast as you can. Avoid
        wrong matches, they add extra time!
      </p>
      <button className={styles.startGameButton} onClick={onStartGame}>
        Start game
      </button>
    </div>
  );
};

export default MatchGameIntro;
