import React from "react";

const QuestionCard = ({ data, onAnswer, index, total }) => {
  return (
    <div>
      <h4>
        Question {index} / {total}
      </h4>

      <h2>{data?.question|| "Loading question..."}</h2>

      <div>
        {data?.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt)}
            style={styles.button}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  button: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    cursor: "pointer",
  },
};

export default QuestionCard;