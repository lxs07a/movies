var mongoose = require("mongoose")
var Schema = mongoose.Schema

var Celebrity = mongoose.model("celebrities", new Schema ({
  name: String,
  movies: String
}), "celebrities")

module.exports = Celebrity