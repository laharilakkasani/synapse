var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var quizRoutes = require("./routes/quiz.routes");
var resultRoutes = require("./routes/result.routes");
var authRoutes = require("./routes/authRoutes");

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/quiz", quizRoutes);
app.use("/api/save-result", resultRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;