var {
  fetchQuizQuestions,
} = require("../services/quiz.service");

const getQuizQuestions = async (req, res) => {
  try {

    // CATEGORY FROM FRONTEND
    const category =
      req.query.category || "all";

    // DIFFICULTY FROM FRONTEND
    const difficulty =
      req.query.difficulty || "easy";

    const data = await fetchQuizQuestions(
      category,
      difficulty
    );

    console.log(
      "Quiz questions fetched successfully"
    );
    console.log(data);
    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch quiz",
    });

  }
};

module.exports = {
  getQuizQuestions,
};