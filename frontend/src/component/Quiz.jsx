import React ,{ useState } from 'react';
import QuestionCard from './QuestionCard';
import Result from './Result';
import ProgressBar from './ProgressBar';
import { useQuiz } from '../hooks/useQuiz';


const Quiz = () => {

    const [category, setCategory] = useState("");    // State to hold selected category
    const [startQuiz, setStartQuiz] = useState(false);

    const { 
        questions, currentIndex, score, 
        showResult, loading, handleAnswer, restartQuiz 
    } = useQuiz(category, startQuiz);

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

                {!startQuiz ? (

                    <div className="flex flex-col gap-4">

                        <h1 className="text-2xl font-bold text-center">
                            Select Category
                        </h1>

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

                        <button
                            onClick={() => setStartQuiz(true)}
                            className="bg-blue-600 text-white p-3 rounded-lg"
                        >
                            Start Quiz
                        </button>

                    </div>

                ) : (

                    showResult ? (

                        <Result 
                            score={score} 
                            total={questions.length} 
                            onRestart={restartQuiz} 
                        />

                    ) : (

                        <>
                            <ProgressBar 
                                current={currentIndex + 1} 
                                total={questions.length} 
                            />

                            <QuestionCard 
                                data={questions[currentIndex]} 
                                index={currentIndex + 1}
                                total={questions.length}
                                choice={handleAnswer} 
                            />
                        </>

                    )

                )}
            </div>
        </div>
    );
}

export default Quiz;