var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema ({
    headline: String,
    summary: String,
    url: {
        type: String,
        unique: true
    }
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;