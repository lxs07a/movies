const express = require("express")
var app = express()
var mongoose = require("mongoose")
var Schema = mongoose.Schema
var hbs = require('hbs')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const path = require('path')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//require('express-router')('thisismynewroutesfolder', app)

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/video", {
  useNewUrlParser: true
})


//app.use("/movies", require("./routes/batman.js"))
app.use("/", require("./routes/movies.js"))
app.use("/", require("./routes/index.js"))
//app.use("/", require("./routes/search.js"))
app.use("/", require("./routes/login.js"))
app.use("/", require("./routes/signup.js"))
app.use("/", require("./routes/celebrities.js"))

// var Movie = mongoose.model("movies", new Schema ({
//   title: String,
//   year: String,
//   genre: Array,
//   director: String,
//   rate: String,
//   duration: String
// }), "movies")

// var User = mongoose.model("logins", new Schema ({
//   username: String,
//   password: String
// }), "logins")

// var Celebrity = mongoose.model("celebrities", new Schema ({
//   name: String,
//   movies: String
// }), "celebrities")

// app.get("/", function(req, res){
//   res.render("index", {name:req.cookies.whoIsLoggedIn}) 
// })

// app.get("/index", function(req, res){
//   res.render("index", {name:req.cookies.whoIsLoggedIn})
// })

// app.get("/batman", function(req, res){
//   Movie.find({}, function(err, result){
//     res.render("batman", {movies:result})
//   })
// })

// app.get("/batman", function(req, res){
//   Movie.find({})
//   .then((result) => {
//     res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
//   })
//   .catch((err)=> {
//     res.send("ERROR")
//   })
// })

// app.post("/search", function(req, res){
//   Movie.find({$or: 
//     [
//       {title: {'$regex': req.body.title, $options: "i"}}, 
//       {year: {'$regex': req.body.title, $options: "i"}}, 
//       {director: {'$regex': req.body.title, $options: "i"}}
//     ]}
//   )
//   .then((result) => {
//     debugger
//     res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
//   })
//   .catch((err)=> {
//     debugger
//     res.send("ERROR")
//   })
// })

// app.get("/search", function(req, res){
//   if (req.cookies.whoIsLoggedIn) {
//     res.render("vipsearch", {name:req.cookies.whoIsLoggedIn})
//   }
//   res.render("search")
// })

// app.post("/create", function(req, res){
//   var movie = new Movie(req.body);
//   movie.save(function(err){
//     if (err) res.send("Error")
//     res.render("created")
//   })
// })

// app.get("/create", function(req, res){
//   if (req.cookies.whoIsLoggedIn) {
//     res.render("create", {name:req.cookies.whoIsLoggedIn})
//   }
//   res.render("login")
// })

// app.post("/signup", function(req, res){
//   var user = new User(req.body);
//   user.save(function(err){
//     if (err) res.send("Error")
//     res.render("vipsearch", {name:req.body.username})
//   })
// })

// app.get("/signup", function(req, res){
//   debugger
//   res.render("signup")
// })

// app.post("/login", function(req, res){
//   User.find({username: req.body.username},
//     function(err, result) {
//       console.log(result)
//       var password = req.body.password
//       if(result[0]===undefined) res.render("errsignup")
//       else if(result[0].password!=password) res.render("errsignup")
//       else if(result[0].username===req.body.username) {
//         res.render("vipsearch", {name:req.body.username})
//         res.cookie('whoIsLoggedIn', req.body.username)
//         console.log('Cookies: ', req.cookies.whoIsLoggedIn)
//       }
//     })
// })

// app.get("/login", function(req, res){
//   debugger
//   res.render("login")
// })

// app.post("/errsignup", function(req, res){
//   var user = new User(req.body);
//   user.save(function(err){
//     if (err) res.send("Error")
//     res.render("vipsearch", {name:req.body.username})
//     res.cookie('whoIsLoggedIn', req.body.username)
//     console.log('Cookies: ', req.cookies.whoIsLoggedIn)
//   })
// })

// app.get("/errsignup", function(req, res){
//   debugger
//   res.render("errsignup")
// })

// app.get("/usersearch", function(req, res){
//   debugger
//   res.render("usersearch")
// })

// app.post("/usersearch", function(req, res){
//   User.find({username:req.body.username}, 
//     function(err, result) {
//       debugger
//       res.render("userssearchresults", {users: result})
//   })
// })

// app.post("/vipsearch", function(req, res){
//   Movie.find({$or: 
//     [
//       {title: {'$regex': req.body.title, $options: "i"}}, 
//       {year: {'$regex': req.body.title, $options: "i"}}, 
//       {director: {'$regex': req.body.title, $options: "i"}}
//     ]}
//   )
//   .then((result) => {
//     debugger
//     res.render("batman", {movies: result, name:req.cookies.whoIsLoggedIn})
//   })
//   .catch((err)=> {
//     debugger
//     res.send("ERROR")
//   })
// })

// app.post("/addcelebrity", function(req, res){
//   var celebrity = new Celebrity(req.body);
//   celebrity.save(function(err){
//     if (err) res.send("Error")
//     res.render("success")
//   })
// })

// app.get("/addcelebrity", function(req, res){
//   if (req.cookies.whoIsLoggedIn) {
//     res.render("addcelebrity", {name:req.cookies.whoIsLoggedIn})
//   }
//   res.render("login")
// })

// app.post("/celebritysearch", function(req, res){
//   Celebrity.find({$or: 
//     [
//       {name: {'$regex': req.body.title, $options: "i"}}, 
//       {movies: {'$regex': req.body.title, $options: "i"}}
//     ]}
//   )
//   .then((result) => {
//     debugger
//     res.render("celebritybatman", {celebrities: result, name:req.cookies.whoIsLoggedIn})
//   })
//   .catch((err)=> {
//     debugger
//     res.send("ERROR")
//   })
// })

// app.get("/celebritysearch", function(req, res){
//   if (req.cookies.whoIsLoggedIn) {
//     res.render("celebritysearch", {name:req.cookies.whoIsLoggedIn})
//   }
//   res.render("login")
// })

app.get("/logout", function (req, res){
  res.render("logout", {name:req.cookies.whoIsLoggedIn})
})

app.get("/successlogout", function (req, res){
  console.log(req.cookies)
  res.clearCookie("whoIsLoggedIn")
  console.log(req.cookies)
  res.render("successlogout")
})

app.listen(3000)