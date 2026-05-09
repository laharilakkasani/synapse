var {
  fetchQuizQuestions,
} = require("../services/quiz.service");

const getQuizQuestions = (req, res) => {
  fetchQuizQuestions()
    .then((data) => res.json(data))
    .catch(() =>
      res.status(500).json({
        error: "Failed to fetch quiz",
      })
    );
};

module.exports = {
  getQuizQuestions,
};