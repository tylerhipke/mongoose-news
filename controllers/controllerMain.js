var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var router = express.Router();

var news = require("../models");

var queryUrl =
  "https://api.nytimes.com/svc/topstories/v2/home.json";

router.get("/", function(req, res) {
  axios
    .get(queryUrl, {
      params: {
        "api-key" : process.env.NYT_API_KEY
      }
    })
    .then(function(response) {
      console.log(response);
      exphbs.render("index");
    })
    .catch(function(error) {
      console.log(error);
    })
});

module.exports = router;