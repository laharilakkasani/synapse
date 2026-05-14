import React from 'react';
import "./quiz.css";

/**
 * QuestionCard displays the current question and its multiple-choice options.
 * @param {object} data - Contains the question text and options array.
 * @param {function} choice - The function to call when an option is clicked.
 * @param {number} index - The current question number.
 * @param {number} total - The total number of questions.
 * @param {function} onPrev - The function to call when the previous button is clicked.
 * @param {function} onNext - The function to call when the next button is clicked.
 */
const QuestionCard = ({ data, choice, index, total, onPrev, onNext }) => {
  // Guard clause: If data isn't loaded yet, return null or a placeholder
  if (!data) return null;

  return (
    <div>

      <p className="question-count">
        {index} of {total} Questions
      </p>

      <h2 className="question-title">
        {data.question}
      </h2>

      <div>

        {data.options.map((option, i) => (
          <button
            key={i}
            onClick={() => choice(option)}
            className="option-btn"
          >
            {option}
          </button>
        ))}

        <div className="nav-buttons">
          <button onClick={onPrev} disabled={index === 0}>
            Previous
          </button>

          <button onClick={onNext} disabled={index === total - 1}>
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default QuestionCard;