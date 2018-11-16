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

app.post("/signup", function(req, res){
  if (req.cookies.whoIsLoggedIn) {
    res.clearCookie("whoIsLoggedIn")
  }
  var user = new User(req.body);
  user.save(function(err){
    if (err) res.send("Error")
    res.render("vipsearch", {name:req.body.username})
    res.cookie('whoIsLoggedIn', req.body.username)
  })
})

app.get("/signup", function(req, res){
  debugger
  res.render("signup")
})

app.post("/errsignup", function(req, res){
  if (req.cookies.whoIsLoggedIn) {
    res.clearCookie("whoIsLoggedIn")
  }
  var user = new User(req.body);
  user.save(function(err){
    if (err) res.send("Error")
    res.render("vipsearch", {name:req.body.username})
    res.cookie('whoIsLoggedIn', req.body.username)
    console.log('Cookies: ', req.cookies.whoIsLoggedIn)
  })
})

app.get("/errsignup", function(req, res){
  debugger
  res.render("errsignup")
})

module.exports = app