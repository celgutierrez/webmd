//Includes & global variables

var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var app = express();


//set & use statements

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

//define routes

app.get('/', function(req, res) {
    res.render('home');

});

//controllers

app.use('/diseases', require('./controllers/diseases'));
app.use('/symptoms', require('./controllers/symptoms'));


//listen
app.listen(3000);
