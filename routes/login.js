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

app.post("/login", function(req, res){
  User.find({username: req.body.username},
    function(err, result) {
      console.log(result)
      var password = req.body.password
      if(result[0]===undefined) res.render("errsignup")
      else if(result[0].password!=password) res.render("errsignup")
      else if(result[0].username===req.body.username) {
        res.render("vipsearch", {name:req.body.username})
        res.cookie('whoIsLoggedIn', req.body.username)
        console.log('Cookies: ', req.cookies.whoIsLoggedIn)
      }
    })
})

app.get("/login", function(req, res){
  debugger
  res.render("login")
})

module.exports = app