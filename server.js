const http= require('http');
const https= require('https');

var port = 8080;
var serverUrl = "127.0.0.1";
var path = require("path");
var fs = require("fs");
var checkMimeType = true;
var Twit= require('twit');
var config= require('./config');
var access= new Twit(config);
var params= {
  q: '#ChadChat',
  count: 50
}

console.log("Starting web server at " + serverUrl + ":" + port);



http.createServer(function (req, res) {
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write("The date and time is currently: " + Date());
  // access.get('search/tweets', params, gotData);
  // res.end();

  var now = new Date();

  var filename = "/index.html";
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",
		".js": "application/javascript",
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png",
		".woff": "application/font-woff",
		".woff2": "application/font-woff2"
	};

	var validMimeType = true;
	var mimeType = validExtensions[ext];
	if (checkMimeType) {
		validMimeType = validExtensions[ext] != undefined;
	}

	if (validMimeType) {
		localPath += filename;
		fs.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + localPath);
				getFile(localPath, res, mimeType);
			} else {
				console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end();
			}
		});

	} else {
		console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
	}


}).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			if (mimeType != undefined) {
				res.setHeader("Content-Type", mimeType);
			}
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

function gotData(err, data, response){
  console.log(data)
}


/*// Storing data:
myObj = { name: "John", age: 31, city: "New York" };
myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);*/