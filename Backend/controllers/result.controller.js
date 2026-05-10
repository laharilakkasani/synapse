var {
  createAttempt,
} = require("../services/result.service");

const saveResult = async (req, res) => {
  const { score, total } = req.body;

  await createAttempt({
    score,
    total,
  });

  res.status(201).json({
    message: "Result saved successfully",
  });
};

module.exports = {
  saveResult,
};