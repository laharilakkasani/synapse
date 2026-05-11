import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Result from "./Result";
import ProgressBar from "./ProgressBar";
import { useQuiz } from "../hooks/useQuiz";

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
    restartQuiz,
    currentDifficulty, 
  } = useQuiz(
    category,
    difficulty,
    startQuiz,
    unlockedLevels,
    setUnlockedLevels
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="text-xl font-bold text-blue-600 animate-pulse">
          Loading {currentDifficulty} Level...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {!startQuiz ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-center">Select Category</h1>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="">Choose Category</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="music">Music</option>
              <option value="geography">Geography</option>
              <option value="film_and_tv">Film & TV</option>
              <option value="society_and_culture">Society & Culture</option>
              <option value="food_and_drink">Food & Drink</option>
              <option value="general_knowledge">General Knowledge</option>
              <option value="arts_and_literature">Arts & Literature</option>
              <option value="sport_and_leisure">Sports</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="easy">Easy</option>
              <option value="medium" disabled={!unlockedLevels.medium}>Medium {unlockedLevels.medium ? '🔓' : '🔒'}</option>
              <option value="hard" disabled={!unlockedLevels.hard}>Hard {unlockedLevels.hard ? '🔓' : '🔒'}</option>
            </select>

            <button
              onClick={() => category ? setStartQuiz(true) : alert("Please select a category")}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start Quiz
            </button>
          </div>
        ) : showResult ? (
          <Result
            score={score}
            // If they finished hard, they did 15 questions total
            total={currentDifficulty === 'hard' ? 15 : currentDifficulty === 'medium' ? 10 : 5}
            // Passing threshold for the whole game
            passed={score >= 12} 
            onRestart={() => {
                setStartQuiz(false); 
                restartQuiz();
            }}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
               <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
                 Current Level: {currentDifficulty}
               </span>
               <span className="text-sm text-gray-500 font-bold">Total Score: {score}</span>
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
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;