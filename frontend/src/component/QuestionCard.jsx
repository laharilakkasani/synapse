import React from 'react';

/**
 * QuestionCard displays the current question and its multiple-choice options.
 * @param {object} data - Contains the question text and options array.
 * @param {function} choice - The function to call when an option is clicked.
 * @param {number} index - The current question number.
 * @param {number} total - The total number of questions.
 */
const QuestionCard = ({ data, choice, index, total }) => {
  // Guard clause: If data isn't loaded yet, return null or a placeholder
  if (!data) return null;

  return (
    <div className="animate-fade-in">
      {/* Question Header */}
      <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
        {index} of {total} questions
      </span>
      
      <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-8">
        {data.question}
      </h2>

      {/* Options List */}
      <div className="flex flex-col gap-4">
        {data.options.map((option, i) => (
          <button
            key={i}
            onClick={() => choice(option)} // Fixed: Changed 'onAnswer' to 'choice' to match props
            className="w-full text-left p-6 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <span className="font-medium text-slate-700 group-hover:text-blue-700">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;