const fetchQuizQuestions = async (
  category,
  difficulty
) => {

  let url =
    "https://the-trivia-api.com/api/questions?limit=5";

  // CATEGORY
  if (
    category &&
    category !== "all"
  ) {
    url += `&categories=${category}`;
  }

  // DIFFICULTY
  if (difficulty) {
    url += `&difficulty=${difficulty}`;
  }

  console.log("Fetching:", url);

  const response = await fetch(url);

  return response.json();
};

module.exports = {
  fetchQuizQuestions,
};