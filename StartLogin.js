var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 7100;

app.get('/', function(request, response) {
  response.send("<h1>Sapbe</h1>");
});

io.on ('connection', function(socket){
	socket.on ("LoginEnterReq", function(){
		console.log("New connection");
		socket.emit("LoginEnterRes");
	});
});

http.listen(port, function(){
	console.log("sapbe");
});
