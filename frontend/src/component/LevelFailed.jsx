const LevelFailed = ({
  currentDifficulty,
  onRetry,
}) => {
  return (
    <div className="text-center">

      <div className="bg-red-100 w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl">
        ❌
      </div>

      <h1 className="text-3xl font-bold mt-6 text-slate-800">
        {currentDifficulty.toUpperCase()} Level Failed
      </h1>

      <p className="text-slate-500 mt-2">
        Try again to clear this level.
      </p>

      <button
        onClick={onRetry}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
      >
        Try Again
      </button>

    </div>
  );
};

export default LevelFailed;