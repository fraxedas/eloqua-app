var http = require("http");
//var express = require("express");

var server = http.createServer(function(req, resp){
	console.log(req.url);
	resp.write(req.url)
	resp.end();
})

server.listen(3000);