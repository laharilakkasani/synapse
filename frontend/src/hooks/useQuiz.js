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
    const isCorrect = selectedOption === questions[currentIndex].answer;
    const newScore = isCorrect ? score + 1 : score;
    
    if (isCorrect) {
      setScore(newScore);
    }

    const nextQuestion = currentIndex + 1;

    if (nextQuestion < questions.length) {
      setCurrentIndex(nextQuestion);
    } else {
      // --- TRANSITION LOGIC ---

      if (currentDifficulty === "easy") {
        if (newScore >= 3) {
          alert(`✅ Level 1 Passed! Moving to Medium...`);
          setUnlockedLevels((prev) => ({ ...prev, medium: true }));
          setCurrentDifficulty("medium");
          loadQuizData(category, "medium");
        } else {
          alert("❌ Level 1 Failed. Try Easy again!");
          resetCurrentLevel(0); // Restart Easy from 0
        }
      } 
      else if (currentDifficulty === "medium") {
        if (newScore >= 7) {
          alert(`✅ Level 2 Passed! Moving to HARD...`);
          setUnlockedLevels((prev) => ({ ...prev, hard: true }));
          setCurrentDifficulty("hard");
          loadQuizData(category, "hard");
        } else {
          alert("❌ Level 2 Failed. Try Medium again!");
          resetCurrentLevel(score - (currentIndex)); // Keeps the score from Level 1, resets Level 2
        }
      } 
      else if (currentDifficulty === "hard") {
        if (newScore >= 12) {
           alert("🎊 CONGRATULATIONS! You have mastered all 3 levels!");
           setShowResult(true);
        } else {
          alert("❌ Level 3 Failed. Try Hard again!");
          resetCurrentLevel(score - (currentIndex)); 
        }
      }
    }
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
  };
};