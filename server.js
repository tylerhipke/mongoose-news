var express = require("express");
var mongoose = require("mongoose");
require("dotenv").config();

var PORT = process.env.PORT || 3000;

var db = require("./models");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(express.static("public"))
//is this needed with handlebars?

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

app.get("/");
