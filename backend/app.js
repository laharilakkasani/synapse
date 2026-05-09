var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var quizRoutes = require("./routes/quiz.routes");
var resultRoutes = require("./routes/result.routes");

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/quiz", quizRoutes);
app.use("/api/save-result", resultRoutes);

module.exports = app;