const fetchQuizQuestions = async () => {
  const response = await fetch(
    "https://the-trivia-api.com/api/questions?limit=5"
  );

  return response.json();
};

module.exports = {
  fetchQuizQuestions,
};