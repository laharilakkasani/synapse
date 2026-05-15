import React, { useState } from "react";
import { submitResult } from "../services/api";
import "./quiz.css";

const Result = ({
  score,
  total,
  passed,
  onRestart,
}) => {

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const handleSubmit = async () => {

    if (isSubmitted) return;

    setIsSubmitting(true);

    try {

      const data = await submitResult(
        score,
        total
      );

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

    <div className="text-center">

      <div className="result-emoji">
        {passed ? "🎉" : "💔"}
      </div>

      <h2 className="result-title">

        {passed
          ? "Level Completed!"
          : "Level Failed!"}

      </h2>

      <p className="result-subtitle">

        {passed
          ? "Next level mann!!"
          : "Try again to unlock next level"}

      </p>

      <div className="score-card">

        <h1>
          {score} / {total}
        </h1>

        <p>FINAL SCORE</p>

      </div>

      <div className="d-flex flex-column gap-3">

        <button
          onClick={handleSubmit}
          disabled={
            isSubmitting || isSubmitted
          }
          className={`btn submit-btn 
          ${
            isSubmitted
              ? "submitted-btn"
              : ""
          }`}
        >

          {isSubmitting
            ? "Submitting..."
            : isSubmitted
            ? "✓ Submitted"
            : "Submit Score"}

        </button>

        <button
          onClick={onRestart}
          className="btn restart-btn"
        >
          Try Again
        </button>

      </div>

    </div>
  );
};

export default Result;