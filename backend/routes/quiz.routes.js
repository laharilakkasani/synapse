var express = require("express");

var router = express.Router();

var {
  getQuizQuestions,
} = require("../controllers/quiz.controller");

router.get("/", getQuizQuestions);

module.exports = router;