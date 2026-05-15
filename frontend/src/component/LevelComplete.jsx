import React from "react";

const LevelComplete = ({
  currentDifficulty = "easy",
  onNextLevel,
  onContinue,
}) => {
  return (
    <div className="text-center">

      <div className="card">
        🏆
      </div>

      <h1 className="level-title">
        {currentDifficulty.toUpperCase()} Level Passed!
      </h1>

      <p className="sub-statement">
        Great job! You've moved to the next level.
      </p>

      <button
        onClick={onContinue}
        className="continue-btn"
      >
        Continue →
      </button>

    </div>
  );
};

export default LevelComplete;