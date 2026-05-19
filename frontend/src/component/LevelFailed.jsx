import React from "react";

const LevelFailed = ({
  currentDifficulty,
  score,
  onRetry,
}) => {
  return (
    <div className="result-wrapper">

      <div className="result-card">

        <div className="failed-icon">
          ❌
        </div>

        <h1 className="failed-title">
          {currentDifficulty ? currentDifficulty.toUpperCase() : "LEVEL"} Level Failed
        </h1>
        
        <h3 className="success-score">
          Score: {score ?? 0}
        </h3>

        <p className="failed-text">
          Try again to clear this level.
        </p>

        <button
          onClick={onRetry}
          className="action-btn"
        >
          Try Again
        </button>

      </div>

    </div>
  );
};

export default LevelFailed;