var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require("connect-flash");

var controllers = require("./controllers");

//Setup the view engine
app.set("view engine", "vash");

/// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
//Todo - Oscar
// flash
app.use(cookieParser());
app.use(session(
	{
		secret: "NebulaApp",
		resave: false,
		saveUninitialized: true
	}));
app.use(flash());

//Set the public static resource folder
app.use(express.static(__dirname + "/public"));

//Setup the routes
controllers.init(app);

//Create the server
var server = http.createServer(app);

//Start listening
server.listen(process.env.PORT || 3000);

var updater = require("./updater");
updater.init(server);