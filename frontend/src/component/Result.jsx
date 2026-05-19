import React, { useState } from "react";
import { submitResult } from "../services/api";
import "./quiz.css";

const Result = ({
  score,
  total,
  passed,
  onRestart,
  onSubmitScore,
}) => {

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const handleSubmit = async () => {

    if (isSubmitted) return;

    setIsSubmitting(true);

    try {

      if(onSubmitScore) {

        await onSubmitScore(score, total, passed)};

      console.log("Success:", data);

      setIsSubmitted(true);

      alert("Score submitted successfully!");

    } catch (error) {

      alert(
        "Failed to submit score. Please try again."
      );

    } finally {

      setIsSubmitting(false);

    }
  };

return (

  <div className="result-wrapper">

    <div className="result-card">

      <div className="result-emoji">
        {passed ? "🎉" : "💔"}
      </div>

      <h2 className="result-main-title">

        {passed
          ? "Quiz Completed!"
          : "Quiz Failed!"}

      </h2>

      <p className="result-subtitle">

        {passed
          ? "Amazing performance!"
          : "Try again to improve your score"}

      </p>

      <div className="score-box">

        <h1>
          {score} / {total}
        </h1>

        <p>FINAL SCORE</p>

      </div>

      <div className="button-group">

        <button
          onClick={handleSubmit}
          disabled={
            isSubmitting || isSubmitted
          }
          className="action-btn"
        >

          {isSubmitting
            ? "Submitting..."
            : isSubmitted
            ? "✓ Submitted"
            : "Submit Score"}

        </button>

        <button
          onClick={onRestart}
          className="retry-btn"
        >
          Play Again
        </button>

      </div>

    </div>

  </div>
);
};

export default Result;


