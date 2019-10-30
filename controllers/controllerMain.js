var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();
var dom = require("./controllerDom.js");
var db = require("../models");
const fs = require("fs");

var queryUrl = "http://www.nytimes.com";

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/pull", function(req, res) {
  axios
    .get(queryUrl)
    .then(function(response) {
      var $ = cheerio.load(response.data);
      var siteContent = $(".css-6p6lnl");
      var result = {};
      $("article").each(function(i, element) {
        console.log(
          $(element)
            .children(".assetWrapper")
            .find(".css-zmhpb6")
            
        );
        result.title = $(element)
          .children(".assetWrapper")
          .find(".css-zmhpb6")
          .text();
      });

      console.log(result);
    })
    .catch(function(error) {
      console.log(error);
    });
  res.render("index");
});

module.exports = router;
