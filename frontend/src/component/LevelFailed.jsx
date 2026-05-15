import React from "react";

const LevelFailed = ({
  currentDifficulty = "easy",
  onRetry,
}) => {
  return (
    <div className="text-center">

      <div className="card">
        ❌
      </div>

      <h1 className="level-title">
        {currentDifficulty.toUpperCase()} Level Failed
      </h1>

      <p className="sub-statement">
        Try again to clear this level.
      </p>

      <button
        onClick={onRetry}
        className="continue-btn"
      >
        Try Again
      </button>

    </div>
  );
};

export default LevelFailed;