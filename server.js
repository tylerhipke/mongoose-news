var express = require("express");
var mongoose = require("mongoose");
require("dotenv").config();

var PORT = process.env.PORT || 3000;

var db = require("./models");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/nyt_db");

db.News.create({
  headline: "test article",
  summary: "summary goes here",
  url: "http://www.google.com"
})
  .then(dbNews => {
    console.log(dbNews);
  })
  .catch(err => {
    console.log(err);
  });

var routes = require("./controllers/catsController.js");

app.use(routes);

app.listen(PORT => {
  console.log("App on port " + PORT);
});
