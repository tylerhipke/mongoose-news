var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();
var db = require("../models/")

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
        currentObj.id = i;
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

router.post("/api/add", function(req,res){
  db.News.create({
    headline: req.body.headline,
    summary: req.body.summary,
    url: req.body.url,
    note: req.body.note
  })
  .then(function(dbNews){
    res.json(dbNews);
  })
  .catch(function(err){
    res.json(err);
  });
});

router.post("api/modify/:id", function(req,res) {
  db.News.create({
    headline: req.body.headline,
    summary: req.body.summary,
    url: req.body.url,
    note: req.body.note
  })
  .then(function(dbNews){
    res.json(dbNews);
    return db.News.findOneAndUpdate(
      { _id: req.params.id }, 
      { note: dbNote._id });
      // { new: true });
  })
  .catch(function(err){
    res.json(err);
  });
});

router.get("/saved", function(req,res){
  db.News.find({})
  .then(function(dbNews){
    // res.json(dbNews);
    res.render("content", { news: dbNews });
  })
  .catch(function(err){
    res.json(err);
  })
});

router.get("/api/modify/:id", function(req, res){
  db.News.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbNews) {
      res.json(dbNews);
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
