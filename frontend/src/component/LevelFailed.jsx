import React from "react";

const LevelFailed = ({
  currentDifficulty,
  onRetry,
}) => {
  return (
    <div className="result-wrapper">

      <div className="result-card">

        <div className="failed-icon">
          ❌
        </div>

        <h1 className="failed-title">
          {currentDifficulty.toUpperCase()} Level Failed
        </h1>

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
