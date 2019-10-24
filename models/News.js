var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema ({
    headline: {
        type: String,
    },
    summary: String,
    url: {
        type: String,
    }
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;