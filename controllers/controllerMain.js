var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

var queryUrl = "https://www.nbcsandiego.com/news/local/";

router.get("/", function(req, res) {
  axios
    .get(queryUrl)
    .then(function(response) {
      var $ = cheerio.load(response.data);
      var siteContent = $("#offlead");
      var result = [];
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
        currentObj.image = $(element)
          .children("div")
          .children("span")
          .children("a")
          .children("img")
          .attr("src");
        if (currentObj.title && currentObj.summary && currentObj.link) {
          result[i] = currentObj;
        }
        return result;
      });
      return result;
    })
    .then(result => {
      console.log(result);
      res.render("index", { articles: result });
    })
    .catch(function(error) {
      console.log(error);
    });
});

router.put("/api/add", function(req,res){

});

router.post("api/update" function(req,res) {

});

router.get("/api/load/all", function(req,res){

});

router.get("/api/load/:id", function(req, res){

});

module.exports = router;
