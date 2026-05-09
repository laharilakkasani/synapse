import React from 'react';
import QuestionCard from './QuestionCard';
import Result from './Result';
import ProgressBar from './ProgressBar';
import { useQuiz } from '../hooks/useQuiz';

const Quiz = () => {
    const { 
        questions, currentIndex, score, 
        showResult, loading, handleAnswer, restartQuiz 
    } = useQuiz();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-100">
                <div className="text-xl font-bold text-blue-600 animate-pulse">Loading Quiz...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {showResult ? (
                    <Result score={score} total={questions.length} onRestart={restartQuiz} />
                ) : (
                    <>
                        <ProgressBar current={currentIndex + 1} total={questions.length} />
                        <QuestionCard 
                            data={questions[currentIndex]} 
                            index={currentIndex + 1}
                            total={questions.length}
                            choice={handleAnswer} 
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Quiz;