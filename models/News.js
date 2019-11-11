var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema ({
    headline: {
        type: String,
        required: true
    },
    summary: String,
    url: {
        type: String,
        required: true
    },
    note: {
        type: String
    }
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;