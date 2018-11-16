const express = require("express")
const app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get("/", function(req, res){
  res.render("index", {name:req.cookies.whoIsLoggedIn}) 
})

app.get("/index", function(req, res){
  res.render("index", {name:req.cookies.whoIsLoggedIn})
})

module.exports = app