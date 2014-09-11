var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StrategySchema = new Schema({
    ticker: String,
    cycle_position: String,
    macro_strategy: String,
    tactical_strategy: String,
    guidance: String,
    portfolio: Boolean,
    watchlist: Boolean
}, {collection: 'strategy'})

module.exports = mongoose.model('strategy', StrategySchema)
