var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();
var dom = require("./controllerDom.js");
var db = require("../models");
const fs = require("fs");

var queryUrl = "https://www.nbcsandiego.com/news/local/";

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/saved", function(req, res){
  res.render("saved");
});

router.get("/pull", function(req, res) {
  axios
    .get(queryUrl)
    .then(function(response) {
      var $ = cheerio.load(response.data);
      var siteContent = $("#offlead");
      var result = {};
      $(".article").each(function(i, element) {
        var currentObj = {};
        currentObj.title = $(element)
          .children("div")
          .children("p")
          .children("a")
          .attr("title");
        currentObj.summary = $(element)
          .children("div")
          .children("p")
          .children("a")
          .attr("data-lid");
        currentObj.link = $(element)
          .children("div")
          .children("p")
          .children("a")
          .attr("href");
        if (currentObj.title && currentObj.summary && currentObj.link) {
          result[i] = currentObj;
        }
      });
      console.log(result);
    })
    .catch(function(error) {
      console.log(error);
    });
  res.render("index");
});

module.exports = router;
