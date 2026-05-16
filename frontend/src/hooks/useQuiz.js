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
  const [levelScore, setLevelScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState(initialDifficulty || "easy");
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showLevelFailed, setShowLevelFailed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const loadQuizData = async (cat, diff) => {
    setLoading(true);
    try {
      const data = await fetchQuestions(cat, diff);
      setQuestions(data || []);
      setCurrentIndex(0);
      // setScore(0);
      setLevelScore(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } catch (error) {
      console.error("Quiz load error:", error);
      setQuestions([]);
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

  const handleAnswer = (selectedOption) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect =
      selectedOption === currentQuestion?.answer;

    if (isCorrect) {
      // TOTAL SCORE
      // setScore((prev) => prev + 1);

      // CURRENT LEVEL SCORE
      // setLevelScore((prev) => prev + 1);

      setLevelScore(levelScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!questions.length) return;

    const isLastQuestion = currentIndex === questions.length - 1;

    setSelectedAnswer(null);
    setIsAnswered(false);

    // MOVE TO NEXT QUESTION
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    // FINAL SCORE (SAFE)
    const finalScore = levelScore;

    // LEVEL LOGIC
    if (currentDifficulty === "easy") {
      if (finalScore >= 3) {
        setScore((prev) => prev + finalScore);
        setUnlockedLevels((prev) => ({ ...prev, "medium" : true }));
        setShowLevelComplete(true);
      } else {
        setShowLevelFailed(true);
      }
    }

    else if (currentDifficulty === "medium") {
      if (finalScore >= 3) {
        setScore((prev) => prev + finalScore);
        setUnlockedLevels((prev) => ({ ...prev, hard: true }));
        setShowLevelComplete(true);
      } else {
        setShowLevelFailed(true);
      }
    }

    else if (currentDifficulty === "hard") {
      if (finalScore >= 3) {
        setScore((prev) => prev + finalScore);
        setShowResult(true);
      } else {
        setShowLevelFailed(true);
      }
    }
  };

  const moveToNextLevel = () => {
    const nextLevel =
      currentDifficulty === "easy"
        ? "medium"
        : currentDifficulty === "medium"
        ? "hard"
        : "hard";

    setCurrentDifficulty(nextLevel);
    setShowLevelComplete(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setLevelScore(0);
    loadQuizData(category, nextLevel);

  };

  const retryLevel = () => {
    setShowLevelFailed(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setLevelScore(0);
    loadQuizData(category, currentDifficulty);
    
  };

  const restartQuiz = () => {
    setScore(0);
    setLevelScore(0);
    setShowResult(false);
    setCurrentDifficulty(initialDifficulty);
    setSelectedAnswer(null);
    setIsAnswered(false);
    loadQuizData(category, initialDifficulty);
    
  };

  return {
    questions,
    currentIndex,
    score,
    showResult,
    loading,
    handleAnswer,
    handleNextQuestion,
    restartQuiz,
    currentDifficulty,
    moveToNextLevel,
    showLevelComplete,
    showLevelFailed,
    retryLevel,
    selectedAnswer,
    isAnswered,
  };
};

