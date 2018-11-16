const express = require("express")
const app = express()

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var Movie = require("../models/movie.js")

//create
app.post("/create", function(req, res){
  var movie = new Movie(req.body);
  movie.save(function(err){
    if (err) res.send("Error")
    res.render("created")
  })
})

app.get("/create", function(req, res){
  if (req.cookies.whoIsLoggedIn) {
    res.render("create", {name:req.cookies.whoIsLoggedIn})
  }
  res.render("login")
})

//search
app.post("/search", function(req, res){
  Movie.find({title: {'$regex': req.body.title, $options: "i"}})
  .then((result) => {
    res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
  })
  .catch((err)=> {
    res.send("ERROR")
  })
})

app.get("/search", function(req, res){
  if (req.cookies.whoIsLoggedIn) {
    res.render("vipsearch", {name:req.cookies.whoIsLoggedIn})
  }
  res.render("search")
})

//vipsearch
app.post("/vipsearch", function(req, res){
  Movie.find({$or: 
    [
      {title: {'$regex': req.body.title, $options: "i"}}, 
      {year: {'$regex': req.body.title, $options: "i"}}, 
      {director: {'$regex': req.body.title, $options: "i"}}
    ]}
  )
  .then((result) => {
    res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
  })
  .catch((err)=> {
    res.send("ERROR")
  })
})

//show results
app.get("/batman", function(req, res){
  Movie.find({})
  .then((result) => {
    res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
  })
  .catch((err)=> {
    res.send("ERROR")
  })
})

module.exports = app
