var http = require("http");
var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hello World");
});

app.get("/user", function(req, res){
	//res.set("Content-Type", "application/json")
	res.send({name : "Oscar Fraxedas", isValid: true});
});

var server = http.createServer(app);

server.listen(3000);