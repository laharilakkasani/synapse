
import React from "react";

const LevelComplete = ({
  currentDifficulty,
  onNextLevel,
  score,
}) => {
  return (
    <div className="result-wrapper">

      <div className="result-card">

        <div className="success-icon">
          🏆
        </div>

        <h1 className="success-title">
          {currentDifficulty.toUpperCase()} Level Passed!
        </h1>

        <h3 className="success-score">
          Score: {score}
        </h3>

        <p className="success-text">
          Great job! You've moved to the next level.
        </p>

        <button
          onClick={onNextLevel}
          className="action-btn"
        >
          Continue →
        </button>

      </div>

    </div>
  );
};

export default LevelComplete;
