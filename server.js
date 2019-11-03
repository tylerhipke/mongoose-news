var express = require("express");
var mongoose = require("mongoose");
require("dotenv").config();

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/nyt_db");

var routes = require("./controllers/controllerMain.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("App running on port " + PORT + "!");
});