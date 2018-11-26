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

mongoose.connect("mongodb://localhost:27017/video", {
  useNewUrlParser: true
})

//create
app.get("/create", function(req, res){
  if (req.cookies.whoIsLoggedIn) {
    res.render("create", {name:req.cookies.whoIsLoggedIn})
  } else res.render("login")
})

app.post("/create", function(req, res){
  Movie.find({title: req.body.title})
  .then ((result) => {
    console.log(result)
    if (result[0]!==undefined) {
      res.render("errcreate", {name:req.cookies.whoIsLoggedIn})
    } else {
        var movie = new Movie(req.body);
        movie.save(function(){
        res.render("created", {name:req.cookies.whoIsLoggedIn})
      })
    }
  })
  .catch((err)=> {
    throw(err)
  })
})

//search
app.get("/search", function(req, res){
  if (req.cookies.whoIsLoggedIn) {
    res.render("vipsearch", {name:req.cookies.whoIsLoggedIn})
  } else res.render("search")
})

app.post("/search", function(req, res){
  Movie.find({title: {'$regex': req.body.title, $options: "i"}})
  .then((result) => {
    res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
  })
  .catch((err)=> {
    throw(err)
  })
})

//vipsearch
app.post("/vipsearch", function(req, res){
  Movie.find({$or: 
    [
      {title: {'$regex': req.body.viptitle, $options: "i"}}, 
      {year: {'$regex': req.body.viptitle, $options: "i"}}, 
      {director: {'$regex': req.body.viptitle, $options: "i"}}
    ]}
  )
  .then((result) => {
    res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
  })
  .catch((err)=> {
    throw(err)
  })
})

//show results
app.get("/batman", function(req, res){
  Movie.find({})
  .then((result) => {
    res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
  })
  .catch((err)=> {
    throw(err)
  })
})

module.exports = app
