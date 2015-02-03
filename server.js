var http = require("http");
var express = require("express");
var app = express();

var controllers = require("./controllers");

//Setup the view engine
app.set("view engine", "vash");

//Setup the routes
controllers.init(app);

//Create the server
var server = http.createServer(app);

//Start listening
server.listen(process.env.PORT || 3000)