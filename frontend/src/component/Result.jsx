import React, { useState } from "react";
import { submitResult } from "../services/api";

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
    <div className="text-center animate-fade-in">

      <div className="text-6xl mb-4">
        {passed ? "🎉" : "❌"}
      </div>

      <h2 className="text-3xl font-extrabold text-slate-800">
        {passed
          ? "Level Completed!"
          : "Level Failed!"}
      </h2>

      <p className="text-slate-500 mt-2 mb-6 font-medium">
        {passed
          ? "Congratulations! 🚀"
          : "Try again"}
      </p>

      {/* SCORE CARD */}
      <div className="bg-blue-50 rounded-2xl py-8 mb-8 border border-blue-100 shadow-inner">
        <p className="text-6xl font-black text-blue-600">
          {score} / {total}
        </p>

        <p className="text-xs text-blue-400 font-bold uppercase mt-2 tracking-widest">
          Final Score
        </p>
      </div>

      <div className="flex flex-col gap-3">

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={
            isSubmitting || isSubmitted
          }
          className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg 
          ${
            isSubmitted
              ? "bg-green-500 text-white cursor-default"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50"
          }`}
        >
          {isSubmitting
            ? "Submitting..."
            : isSubmitted
            ? "✓ Submitted"
            : "Submit Score"}
        </button>

        {/* RESTART BUTTON */}
        <button
          onClick={onRestart}
          className="w-full bg-white text-slate-700 border-2 border-slate-200 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
        >
          Try Again
        </button>

      </div>
    </div>
  );
};

export default Result;