import React from "react";

const LevelComplete = ({
  currentDifficulty,
  onNextLevel,
}) => {
  return (
    <div className="text-center">

      <div className="bg-purple-100 w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl">
        🏆
      </div>

      <h1 className="text-3xl font-bold mt-6 text-slate-800">
        {currentDifficulty.toUpperCase()} Level Passed!
      </h1>

      <p className="text-slate-500 mt-2">
        Great job! You've moved to the next level.
      </p>

      <button
        onClick={onNextLevel}
        className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
      >
        Continue →
      </button>

    </div>
  );
};

export default LevelComplete;