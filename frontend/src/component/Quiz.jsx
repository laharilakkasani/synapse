import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Result from "./Result";
import ProgressBar from "./ProgressBar";
import { useQuiz } from "../hooks/useQuiz";
import "./quiz.css";

const Quiz = () => {
  // State for selected category and difficulty
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  // State to track unlocked difficulty levels
  const [unlockedLevels, setUnlockedLevels] = useState({
    easy: true,
    medium: false,
    hard: false,
  });

  // State to track if quiz has started
  const [startQuiz, setStartQuiz] = useState(false);

  // Custom hook to manage quiz state and logic
  const {
    questions,
    currentIndex,
    score,
    showResult,
    loading,
    handleAnswer,
    restartQuiz,
    currentDifficulty,
    levelComplete,
    levelStatus,
    levelMessage
  } = useQuiz(
    category,
    difficulty,
    startQuiz,
    unlockedLevels,
    setUnlockedLevels
  );

// categories data
  const categories = [
    {
      name: "science",
      icon: "bi bi-flask"
    },
    {
      name: "history",
      icon: "bi bi-bank"
    },
    {
      name: "music",
      icon: "bi bi-music-note-beamed"
    },
    {
      name: "geography",
      icon: "bi bi-globe"
    },
    {
      name: "film_and_tv",
      icon: "bi bi-camera-reels"
    },
    {
      name: "general_knowledge",
      icon: "bi bi-lightbulb"
    },
  ];

// // next and previous question handlers
// //const [Index, setIndex] = useState(0);

const nextQuestion = () => {
  setCurrentIndex(prev =>
    prev < (questions?.length ?? 0) - 1 ? prev + 1 : prev
  );
};

const prevQuestion = () => {
  setCurrentIndex(prev =>
    prev > 0 ? prev - 1 : prev
  );
};

// loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Loading Quiz...</h1>
      </div>
    );
  }

  // Result submission handler
  if (levelComplete) {
  return (
    <div className="level-complete-screen">

      <h1>
        {levelStatus === "passed" ? "Level Passed!" : "Level Failed"}
      </h1>

      <p>{levelMessage}</p>

      {levelStatus === "passed" ? (
        <p>Ready for the next challenge? 🚀</p>
      ) : (
        <p>Don’t worry, try again and you’ll get it!!</p>
      )}

      <button
        className="btn start-btn"
        onClick={() => {
          setLevelComplete(false);
          setLevelStatus(null);
        }}
      >
        {levelStatus === "passed" ? "Continue →" : "Retry Level"}
      </button>

    </div>
  );
}

  return (
    <div className="quiz-bg">

      <div className="container d-flex justify-content-center align-items-center min-vh-100">

        <div className="quiz-card">

          {!startQuiz ? (

            <>
              <h1 className="title">Synapse</h1>

              <p className="subtitle">
                Choose category and difficulty
              </p>

              <div className="category-grid">

                {categories.map((cat) => (

                  <div
                    key={cat.name}
                    className={`category-box ${
                      category === cat.name
                        ? "active-category"
                        : ""
                    }`}
                    onClick={() => setCategory(cat.name)}
                  >

                    <i className={`${cat.icon} category-icon`}></i>

                    <p>
                      {cat.name.replaceAll("_", " ")}
                    </p>

                  </div>

                ))}

              </div>

              <div className="difficulty-buttons">

                <button
                  className={`btn level-btn ${
                    difficulty === "easy"
                      ? "active-easy"
                      : ""
                  }`}
                  onClick={() => setDifficulty("easy")}
                >
                  Easy
                </button>

                <button
                  className={`btn level-btn ${
                    difficulty === "medium"
                      ? "active-medium"
                      : ""
                  }`}
                  disabled={!unlockedLevels.medium}
                  onClick={() => setDifficulty("medium")}
                >
                  Medium
                </button>

                <button
                  className={`btn level-btn ${
                    difficulty === "hard"
                      ? "active-hard"
                      : ""
                  }`}
                  disabled={!unlockedLevels.hard}
                  onClick={() => setDifficulty("hard")}
                >
                  Hard
                </button>

              </div>

              <button
                className="btn start-btn"
                onClick={() =>
                  category
                    ? setStartQuiz(true)
                    : alert("Select category first")
                }
              >
                Start Quiz →
              </button>

            </>

          ) : showResult ? (

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

          ) : (

            <>
              <div className="top-bar">

                <span>
                  Level: {currentDifficulty}
                </span>

                <span>
                  Score: {score}
                </span>

              </div>

              <ProgressBar
                current={currentIndex + 1}
                total={5}
              />

              <QuestionCard
                data={questions[currentIndex]}
                index={currentIndex + 1}
                total={5}
                choice={handleAnswer}
                onPrev={prevQuestion}
                onNext={nextQuestion}
              />
            </>

          )}

        </div>

      </div>

    </div>
  );
};

export default Quiz;