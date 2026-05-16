const BASE_URL = "https://synapse-40yj.onrender.com";

export const fetchQuestions = async (
  category,
  difficulty
) => {
  try {
    let url = `${BASE_URL}/api/quiz?category=${category}`;

    // add level/difficulty
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }

    const response = await fetch(url);

    if (!response.ok)
      throw new Error("Failed to fetch questions");

    const data = await response.json();

    return data.map((q) => ({
      question: q.question,

      options: [
        ...q.incorrectAnswers,
        q.correctAnswer,
      ].sort(() => Math.random() - 0.5),

      answer: q.correctAnswer,
    }));
  } catch (error) {
    console.error(
      "Error in fetchQuestions:",
      error
    );

    throw error;
  }
};

export const submitResult = async (
  score,
  total
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/save-result`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          score,
          total,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(
      "Failed to submit result:",
      error
    );

    throw error;
  }
};