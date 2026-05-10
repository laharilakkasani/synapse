var express = require("express");

var router = express.Router();

var {
  saveResult,
} = require("../controllers/result.controller");

router.post("/", saveResult);

module.exports = router;