var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var router = express.Router();
var dom = require("./controllerDom.js");
var db = require("../models");

var queryUrl = "https://api.nytimes.com/svc/topstories/v2/home.json";

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/pull", function(req, res) {
}

module.exports = Router;
