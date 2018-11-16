var mongoose = require("mongoose")
var Schema = mongoose.Schema

var Movie = mongoose.model("movies", new Schema ({
  title: String,
  year: String,
  genre: Array,
  director: String,
  rate: String,
  duration: String
}), "movies")

module.exports = Movie