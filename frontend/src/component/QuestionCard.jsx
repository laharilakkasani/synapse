import React from 'react';

const QuestionCard = ({
  data,
  choice,
  index,
  total,
  selectedAnswer,
  isAnswered,
  onNext
}) => {

  if (!data) return null;

  // OPTION BUTTON COLORS
  const getOptionStyle = (option) => {

    // BEFORE ANSWERING
    if (!isAnswered) {
      return "border-slate-200 hover:border-blue-300 hover:bg-blue-50";
    }

    // CORRECT ANSWER
    if (option === data.answer) {
      return "bg-green-500 border-green-500 text-white";
    }

    // WRONG SELECTED ANSWER
    if (
      option === selectedAnswer &&
      option !== data.answer
    ) {
      return "bg-red-500 border-red-500 text-white";
    }

    // OTHER OPTIONS
    return "bg-gray-100 border-gray-200 text-gray-500";
  };

  return (
    <div className="animate-fade-in">

      {/* Question Header */}
      <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
        {index} of {total} questions
      </span>

      {/* Question */}
      <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-8">
        {data.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-4">

        {data.options.map((option, i) => (

          <button
            key={i}
            onClick={() => choice(option)}

            // DISABLE AFTER ANSWER
            disabled={isAnswered}

            className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 font-medium ${getOptionStyle(option)}`}
          >
            {option}
          </button>

        ))}

      </div>

      {/* NEXT BUTTON */}
      {isAnswered && (

        <button
          onClick={onNext}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all duration-200"
        >
          Next Question →
        </button>

      )}

    </div>
  );
};

export default QuestionCard;