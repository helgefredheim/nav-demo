var livereload = require('livereload');
var express = require('express');
var fs = require("fs");
var app = express();
var port = process.env.PORT || 1234;
var appFolder = "/public";

app.use(express.static(__dirname + appFolder));

var server = app.listen(port, function() {
  console.log('Server started running on port: ' + port)
});

fs.readdir("app/snippets", function (err, files) {
	files = files.filter(function(file) {
		return file.split(".")[1] === "html";
	});

	files = files.map(function(file) {
		return file.split(".")[0];
	});

	var fileContent = "module.exports = " + JSON.stringify(files); 

	fs.writeFile("app/scripts/snippets.js", fileContent);
});

server = livereload.createServer();
server.watch(__dirname + appFolder);