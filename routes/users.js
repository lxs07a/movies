const express = require("express")
const app = express()

var session = require('express-session')

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
    res.clearCookie("whoIsLoggedIn")
    User.find({username: req.body.username},
        function(err, result) {
          if(result[0]) res.render("errlogin")
          else {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                var user = new User({username:req.body.username, password:hash})
                user.save(function(err){
                    res.cookie('whoIsLoggedIn', req.body.username)
                    res.render("vipsearch", {name:req.body.username})
                })
            })
        }        
    })
})

app.get("/vipsearch", function(req, res){
    res.render("vipsearch")
})

//Error sign up page
app.get("/errsignup", function(req, res){
    res.render("errsignup")
})

app.post("/errsignup", function(req, res){
    res.clearCookie("whoIsLoggedIn")
    User.find({username: req.body.username},
        function(err, result) {
          if(result[0]) res.render("errlogin")
          else {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                var user = new User({username:req.body.username, password:hash})
                user.save(function(err){
                    res.cookie('whoIsLoggedIn', req.body.username)
                    res.render("vipsearch", {name:req.body.username})
                })
            })
        }        
    })
})

//Log In page
app.get("/login", function(req, res){
    res.render("login")
})

app.post("/login", function(req, res){
    User.find({username: req.body.username},
      function(err, result) {
        if(result[0]===undefined) res.render("errsignup")
        bcrypt.compare(req.body.password, result[0].password, function(err, res) {
            if(false) res.render("errsignup")
        })
        res.cookie('whoIsLoggedIn', req.body.username)
        res.render("vipsearch", {name:req.body.username})
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