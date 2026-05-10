var {
  fetchQuizQuestions,
} = require("../services/quiz.service");

const getQuizQuestions = async (req, res) => {
  try {
    const category = req.query.category || "all";    //category param from frontend

    const data = await fetchQuizQuestions(category); 

    console.log("Quiz questions fetched successfully");

    res.json(data);
  } 
  catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch quiz",
    });
  }
};

module.exports = {
  getQuizQuestions,
};