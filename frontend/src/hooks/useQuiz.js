import { useState, useEffect } from "react";
import { fetchQuestions } from "../services/api";

export const useQuiz = (
  category,
  initialDifficulty,
  startQuiz,
  unlockedLevels,
  setUnlockedLevels
) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState(initialDifficulty || "easy");
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showLevelFailed,setShowLevelFailed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const loadQuizData = async (cat, diff) => {
    setLoading(true);
    try {
      const data = await fetchQuestions(cat, diff);
      setQuestions(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Quiz load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startQuiz && category) {
      setCurrentDifficulty(initialDifficulty);
      loadQuizData(category, initialDifficulty);
    }
  }, [startQuiz, category, initialDifficulty]);

  // Helper to retry the same level if failed
  const resetCurrentLevel = (levelStartScore) => {
    setScore(levelStartScore);
    setCurrentIndex(0);
    loadQuizData(category, currentDifficulty);
  };

  const handleAnswer = (selectedOption) => {

    // PREVENT MULTIPLE CLICKS
    if (isAnswered) return;

    setSelectedAnswer(selectedOption);

    setIsAnswered(true);

    const isCorrect =
      selectedOption === questions[currentIndex].answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };


  const handleNextQuestion = () => {

    const nextQuestion = currentIndex + 1;

    // RESET STATES
    setSelectedAnswer(null);

    setIsAnswered(false);

    // NEXT QUESTION
    if (nextQuestion < questions.length) {

      setCurrentIndex(nextQuestion);

    } else {

      // TOTAL SCORE AFTER LAST ANSWER
      const finalScore =
        selectedAnswer === questions[currentIndex].answer
          ? score
          : score;

      // EASY LEVEL
      if (currentDifficulty === "easy") {

        if (finalScore >= 3) {

          setUnlockedLevels((prev) => ({
            ...prev,
            medium: true,
          }));

          setShowLevelComplete(true);

        } else {

          setShowLevelFailed(true);
        }
      }

      // MEDIUM LEVEL
      else if (currentDifficulty === "medium") {

        if (finalScore >= 8) {

          setUnlockedLevels((prev) => ({
            ...prev,
            hard: true,
          }));

          setShowLevelComplete(true);

        } else {

          setShowLevelFailed(true);
        }
      }

      // HARD LEVEL
      else if (currentDifficulty === "hard") {

        if (finalScore >= 12) {

          setShowResult(true);

        } else {

          setShowLevelFailed(true);
        }
      }
    }
    };


  const moveToNextLevel = () => {

    // EASY -> MEDIUM
    if (currentDifficulty === "easy") {

      setCurrentDifficulty("medium");

      loadQuizData(category, "medium");
    }

    // MEDIUM -> HARD
    else if (currentDifficulty === "medium") {

      setCurrentDifficulty("hard");

      loadQuizData(category, "hard");
    }

    setSelectedAnswer(null);

    setIsAnswered(false);

    // HIDE LEVEL COMPLETE CARD
    setShowLevelComplete(false);
  };


  const retryLevel = () => {

    setShowLevelFailed(false);

    setSelectedAnswer(null);

    setIsAnswered(false);
    // RELOAD SAME LEVEL QUESTIONS
    loadQuizData(category, currentDifficulty);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setCurrentDifficulty(initialDifficulty);
    loadQuizData(category, initialDifficulty);
  };

  return {
    questions,
    currentIndex,
    score,
    showResult,
    loading,
    handleAnswer,
    restartQuiz,
    currentDifficulty,
    moveToNextLevel,
    showLevelComplete,
    showLevelFailed,
    retryLevel,
    selectedAnswer,
    isAnswered,
    handleNextQuestion,
  };
};