const http= require('http');
const https= require('https');
var Twit= require('twit');
var config= require('./config');
var access= new Twit(config);

var params= {
  q: 'rainbow',
  count: 2
}

access.get('search/tweets', params, gotData);
function gotData(err, data, response){
  console.log(data)
}



http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time is currently: " + Date());
  res.end();

}).listen(8080);

/*// Storing data:
myObj = { name: "John", age: 31, city: "New York" };
myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);*/