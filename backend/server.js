require("dotenv").config();

var app = require("./app");
var dbConnect = require("./config/db");

dbConnect();

app.listen(process.env.PORT || 4500, () => {
  console.log("server running on " + process.env.PORT);
});