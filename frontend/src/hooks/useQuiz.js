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

  const [levelComplete, setLevelComplete] = useState(false);
  const [levelStatus, setLevelStatus] = useState(null);
  const [levelMessage, setLevelMessage] = useState("");

  //loading questions
  const loadQuizData = async (cat, diff, keepScore = false) => {
    setLoading(true);
    try {
      const data = await fetchQuestions(cat, diff);

      setQuestions(data);
      setCurrentIndex(0);

      setShowResult(false);

      setLevelComplete(false);
      setLevelStatus(null);
      setLevelMessage("");
      
    } catch (error) {
      console.error("Quiz load error:", error);
    } finally {
      setLoading(false);
    }
  };

  // start quiz when category is selected
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

  // Handle answer selection and quiz progression
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
          alert("try medium");
            setLevelStatus("passed");
            setLevelMessage("Easy completed!");
            setLevelComplete(true);
          setUnlockedLevels((prev) => ({ ...prev, medium: true }));
          setCurrentDifficulty("medium");
          loadQuizData(category, "medium");
        } else {
          resetCurrentLevel(0); // Restart Easy from 0
          alert("try again");
            setLevelStatus("failed");
            setLevelMessage("Try again, you’re close!");
            setLevelComplete(true);

        }
      } 
      else if (currentDifficulty === "medium") {
        if (newScore >= 7) {
          alert("try hard");
            setLevelStatus("passed");
            setLevelMessage("Medium completed!");
            setLevelComplete(true);
          setUnlockedLevels((prev) => ({ ...prev, hard: true }));
          setCurrentDifficulty("hard");
          loadQuizData(category, "hard", true); // Keep score for hard level
        } else {
          alert("try again"); 
          setLevelStatus("failed");
          setLevelMessage("Try again, you’re close!");
          setLevelComplete(true);
          resetCurrentLevel(score - (currentIndex)); // Keeps the score from Level 1, resets Level 2
        }
      } 
      else if (currentDifficulty === "hard") {
        if (newScore >= 12) {
          alert("congrats you completed the quiz");
          setLevelStatus("passed");
          setLevelMessage("Hard completed!");
          setLevelComplete(true);
          setShowResult(true);
        } else {
          alert("try again");
          setLevelStatus("failed");
          setLevelMessage("Try again, you’re close!");
          setLevelComplete(true); 
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
    levelComplete,
    levelStatus,
    levelMessage,
    currentDifficulty,
  };
};