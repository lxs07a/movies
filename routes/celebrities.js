const express = require("express")
const app = express()

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var Celebrity = require("../models/celebrity.js")

//create
app.post("/addcelebrity", function(req, res){
  var celebrity = new Celebrity(req.body);
  celebrity.save(function(err){
    if (err) res.send("Error")
    res.render("success")
  })
})

app.get("/addcelebrity", function(req, res){
  if (req.cookies.whoIsLoggedIn) {
    res.render("addcelebrity", {name:req.cookies.whoIsLoggedIn})
  }
  res.render("login")
})

//search
app.post("/celebritysearch", function(req, res){
  Celebrity.find({$or: 
    [
      {name: {'$regex': req.body.title, $options: "i"}}, 
      {movies: {'$regex': req.body.title, $options: "i"}}
    ]}
  )
  .then((result) => {
    res.render("celebritybatman", {celebrities: result, name:req.cookies.whoIsLoggedIn})
  })
  .catch((err)=> {
    res.send("ERROR")
  })
})

app.get("/celebritysearch", function(req, res, err){
  if (req.cookies.whoIsLoggedIn) {
    res.render("celebritysearch", {name:req.cookies.whoIsLoggedIn})
  }
  res.render("login")

})

module.exports = app