import React from "react";
import "./quiz.css";

const QuestionCard = ({
  data,
  choice,
  index,
  total,
  onNext,
  selectedOption,
}) => {
  if (!data) return null;

  return (
    <div>
      <p className="question-count">
        {index} of {total} Questions
      </p>

      <h2 className="question-title">{data.question}</h2>

      <div>
        {data.options.map((option, i) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === data.answer;

          return (
            <button
              key={i}
              onClick={() => choice(option)}
              className={`option-btn
                ${isSelected ? "selected" : ""}
                ${selectedOption && isCorrect ? "correct" : ""}
                ${selectedOption && isSelected && !isCorrect ? "wrong" : ""}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="nav-buttons">
        <button onClick={onNext} disabled={!selectedOption}>
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
