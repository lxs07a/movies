const express = require("express")
const app = express()

var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var User = require("../models/user.js")

app.get("/usersearch", function(req, res){
  debugger
  res.render("usersearch")
})

app.post("/usersearch", function(req, res){
  User.find({username:req.body.username}, 
    function(err, result) {
      debugger
      res.render("userssearchresults", {users: result})
  })
})

module.exports = app