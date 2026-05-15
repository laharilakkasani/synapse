import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Result from "./Result";
import ProgressBar from "./ProgressBar";
import { useQuiz } from "../hooks/useQuiz";
import LevelFailed from "./LevelFailed";

const Quiz = () => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const [unlockedLevels, setUnlockedLevels] = useState({
    easy: true,
    medium: false,
    hard: false,
  });

  const [startQuiz, setStartQuiz] = useState(false);

  const {
    questions,
    currentIndex,
    score,
    showResult,
    loading,
    handleAnswer,
    handleNextQuestion,
    restartQuiz,
    currentDifficulty,
    showLevelComplete,
    showLevelFailed,
    moveToNextLevel,
    retryLevel,
    selectedAnswer,
    isAnswered,
  } = useQuiz(
    category,
    difficulty,
    startQuiz,
    unlockedLevels,
    setUnlockedLevels
  );

  const categories = [
    { name: "science", icon: "bi bi-flask" },
    { name: "history", icon: "bi bi-bank" },
    { name: "music", icon: "bi bi-music-note-beamed" },
    { name: "geography", icon: "bi bi-globe" },
    { name: "film_and_tv", icon: "bi bi-camera-reels" },
    { name: "general_knowledge", icon: "bi bi-lightbulb" },
  ];

  /* LOADING */
  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Loading Quiz...</h1>
      </div>
    );
  }

  /* LEVEL COMPLETE */
  if (showLevelComplete) {
    return (
      <div className="level-complete-screen">
        <h1>
          {currentDifficulty.toUpperCase()} Level Complete 🎉
        </h1>

        <p>
          Great job! You cleared this level.
        </p>

        <button className="start-btn" onClick={moveToNextLevel}>
          Continue →
        </button>
      </div>
    );
  }

  /* RESULT */
  if (showResult) {
    return (
      <Result
        score={score}
        total={
          currentDifficulty === "hard"
            ? 15
            : currentDifficulty === "medium"
            ? 10
            : 5
        }
        passed={score >= 12}
        onRestart={() => {
          setStartQuiz(false);
          restartQuiz();
        }}
      />
    );
  }

  const currentQuestion = questions?.[currentIndex];

  //level failed component
  if (showLevelFailed) {
    return <LevelFailed nRetry={retryLevel}  />;
  }

  return (
    <div className="quiz-bg">

      <div className="container d-flex justify-content-center align-items-center min-vh-100">

        <div className="quiz-card">

          {/* START SCREEN */}
          {!startQuiz ? (
            <>
              <h1 className="title">Synapse</h1>

              <p className="subtitle">
                Choose category and difficulty
              </p>

              {/* CATEGORY GRID */}
              <div className="category-grid">

                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className={`category-box ${
                      category === cat.name ? "active-category" : ""
                    }`}
                    onClick={() => setCategory(cat.name)}
                  >
                    <i className={`${cat.icon} category-icon`} />
                    <p>{cat.name.replaceAll("_", " ")}</p>
                  </div>
                ))}

              </div>

              {/* DIFFICULTY */}
              <div className="difficulty-buttons">

                <button
                  className={`level-btn ${
                    difficulty === "easy" ? "active-easy" : ""
                  }`}
                  onClick={() => setDifficulty("easy")}
                >
                  Easy
                </button>

                <button
                  className={`level-btn ${
                    difficulty === "medium" ? "active-medium" : ""
                  }`}
                  disabled={!unlockedLevels.medium}
                  onClick={() => setDifficulty("medium")}
                >
                  Medium
                </button>

                <button
                  className={`level-btn ${
                    difficulty === "hard" ? "active-hard" : ""
                  }`}
                  disabled={!unlockedLevels.hard}
                  onClick={() => setDifficulty("hard")}
                >
                  Hard
                </button>

              </div>

              <button
                className="start-btn"
                onClick={() =>
                  category
                    ? setStartQuiz(true)
                    : alert("Select category first")
                }
              >
                Start Quiz →
              </button>

            </>
          ) : (
            <>
              {/* TOP BAR */}
              <div className="top-bar">
                <span>Level: {currentDifficulty}</span>
                <span>Score: {score}</span>
              </div>

              {/* PROGRESS */}
              <ProgressBar
                current={currentIndex + 1}
                total={questions.length}
              />

              {/* QUESTION */}
              <QuestionCard
                data={questions[currentIndex]}
                index={currentIndex + 1}
                total={questions.length}
                choice={handleAnswer}
                onNext={handleNextQuestion}
                correctAnswer={currentQuestion?.answer}
                isAnswered={isAnswered}
                selectedOption={selectedAnswer}
              />
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Quiz;