const express = require('express')
var app = express()

var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var hbs = require('hbs')
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', __dirname + '/views')

mongoose.connect("mongodb://localhost:27017/video", {
  useNewUrlParser: true
})

app.use("/", require("./routes/index.js"))
app.use("/", require("./routes/movies.js"))
app.use("/", require("./routes/users.js"))
app.use("/", require("./routes/celebrities.js"))

app.listen(3000)