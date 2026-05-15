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

  const [currentDifficulty, setCurrentDifficulty] = useState(
    initialDifficulty || "easy"
  );

  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showLevelFailed, setShowLevelFailed] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // 📦 Load questions
  const loadQuizData = async (cat, diff, isRetryOrRestart = false) => {
    setLoading(true);
    try {
      const data = await fetchQuestions(cat, diff);
      setQuestions(data || []);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      
      // ✅ Fixed case sensitivity: resets score only on clean restarts or retries
      if (isRetryOrRestart) {
        setScore(0);
      }
    } catch (error) {
      console.error("Quiz load error:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Start quiz
  useEffect(() => {
    if (startQuiz && category) {
      setCurrentDifficulty(initialDifficulty);
      loadQuizData(category, initialDifficulty, true);
    }
  }, [startQuiz, category, initialDifficulty]);

  // ✅ Answer handling
  const handleAnswer = (selectedOption) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion?.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  // 👉 Move questions
  const handleNextQuestion = () => {
    if (!questions.length) return;

    const isLastQuestion = currentIndex === questions.length - 1;

    if (!isLastQuestion) {
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    // Capture precise live score state mapping
    const currentQuestion = questions[currentIndex];
    const lastAnswerWasCorrect = selectedAnswer === currentQuestion?.answer;
    const finalScore = lastAnswerWasCorrect ? score + 1 : score;

    setSelectedAnswer(null);
    setIsAnswered(false);

    // LEVEL PROGRESSION CHECKS
    if (currentDifficulty === "easy") {
      if (finalScore >= 3) { 
        setUnlockedLevels((prev) => ({ ...prev, medium: true }));
        setShowLevelComplete(true);
      } else {
        setShowLevelFailed(true);
      }
      return;
    }

    if (currentDifficulty === "medium") {
      if (finalScore >= 8) { 
        setUnlockedLevels((prev) => ({ ...prev, hard: true }));
        setShowLevelComplete(true);
      } else {
        setShowLevelFailed(true);
      }
      return;
    }

    if (currentDifficulty === "hard") {
      if (finalScore >= 12) {
        setShowResult(true);
      } else {
        setShowLevelFailed(true);
      }
      return;
    }
  };

  // ⏭ Next level
  const moveToNextLevel = () => {
    const nextLevel =
      currentDifficulty === "easy"
        ? "medium"
        : "hard";

    setCurrentDifficulty(nextLevel);
    setShowLevelComplete(false);
    // Passing false preserves the accumulated score from previous tier!
    loadQuizData(category, nextLevel, false);
  };

  // 🔁 Retry level
  const retryLevel = () => {
    setShowLevelFailed(false);
    loadQuizData(category, currentDifficulty, true);
  };

  // 🔄 Restart quiz
  const restartQuiz = () => {
    setShowResult(false);
    setCurrentDifficulty(initialDifficulty);
    loadQuizData(category, initialDifficulty, true);
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