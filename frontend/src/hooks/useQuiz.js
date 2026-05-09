import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';

export const useQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadQuizData = async () => {
        setLoading(true);
        try {
            const data = await fetchQuestions();
            setQuestions(data);
        } catch (error) {
            console.error("Quiz load error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQuizData();
    }, []);

    const handleAnswer = (selectedOption) => {
        if (selectedOption === questions[currentIndex].answer) {
            setScore(prev => prev + 1);
        }

        const nextQuestion = currentIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentIndex(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        loadQuizData();
    };

    return { questions, currentIndex, score, showResult, loading, handleAnswer, restartQuiz };
};