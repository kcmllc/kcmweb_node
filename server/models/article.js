var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
    publication: String,
    publication_date: Date,
    title: String,
    content: String,
    tags: String,
    ticker: String,
    thoughts: String
})

module.exports = mongoose.model('article', ArticleSchema)
