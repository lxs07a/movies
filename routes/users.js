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

const bcrypt = require('bcrypt')
const saltRounds = 2

//Sign Up page

app.get("/signup", function(req, res){
    res.render("signup")
})

app.post("/signup", function(req, res){
    console.log("Cookie ", req.cookies)
//   if (req.cookies.whoIsLoggedIn) {
//       debugger
//     res.clearCookie("whoIsLoggedIn")
//   }
  debugger
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    var user = new User({username:req.body.username, password:hash})
    user.save()
    res.cookie('whoIsLoggedIn', req.body.username)
    debugger
    res.render("vipsearch", {name:req.cookies.whoIsLoggedIn})
  })
})

//Error sign up page
app.get("/errsignup", function(req, res){
    res.render("errsignup")
})

app.post("/errsignup", function(req, res){
  if (req.cookies.whoIsLoggedIn) {
    res.clearCookie("whoIsLoggedIn")
  }
  var user = new User(req.body)
  user.save(function(err){
    if (err) res.send("Error")
    res.render("vipsearch", {name:req.body.username})
    res.cookie('whoIsLoggedIn', req.body.username)
    console.log('Cookies: ', req.cookies.whoIsLoggedIn)
  })
})

//Log In page
app.get("/login", function(req, res){
    res.render("login")
})

app.post("/login", function(req, res){
    User.find({username: req.body.username},
      function(err, result) {
        console.log(result)
        var password = req.body.password
        if(result[0]===undefined) res.render("errsignup")
        else if(result[0].password!=password) res.render("errsignup")
        else if(result[0].username===req.body.username) {
            res.cookie('whoIsLoggedIn', req.body.username)
            res.render("vipsearch", {name:req.body.username})
          console.log('Cookies: ', req.cookies.whoIsLoggedIn)
        }
    })
})

//Log Out page
app.get("/logout", function (req, res){
    res.render("logout", {name:req.cookies.whoIsLoggedIn})
})
  
app.get("/successlogout", function (req, res){
    console.log(req.cookies)
    res.clearCookie("whoIsLoggedIn")
    console.log(req.cookies)
    res.render("successlogout")
})

//Search Users
app.get("/usersearch", function(req, res){
    res.render("usersearch")
})
  
app.post("/usersearch", function(req, res){
    User.find({username:req.body.username}, 
        function(err, result) {
        res.render("userssearchresults", {users: result})
    })
})

module.exports = app