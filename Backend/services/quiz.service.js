const fetchQuizQuestions = async (category) => {
  const response = await fetch(
    `https://the-trivia-api.com/api/questions?limit=5&categories=${category}`
  );

  return response.json();
};

module.exports = {
  fetchQuizQuestions,
};