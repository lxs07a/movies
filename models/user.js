var mongoose = require("mongoose")
var Schema = mongoose.Schema

var User = mongoose.model("logins", new Schema ({
  username: String,
  password: String
}), "logins")

module.exports = User