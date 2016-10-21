var Login = require ('./Login.js');

var app = require('express')();
var http = require('http').Server(app);
var ioo = require ('socket.io');

var port = process.env.PORT || 7100;

app.get('/', function(req, res){
	res.send("<h1>Server is running on " + port + "</h1>");
	InitializeServer();
});


var InitializeServer = function () {
	
	var io = ioo.listen(http, false);

	io.on ('connection', function (socket){
		var NewClient = new Login.Start(socket);
		StartEvents(socket,NewClient);	
	});

	console.log('Server is running on ' + port);
};

function StartEvents (socket, NewClient){
	socket.on ("LoginEnterReq", function(){
		console.log("New connection");
		socket.emit("LoginEnterRes");
	});

	socket.on ('ConfirmAccountReq', NewClient.Confirm);
	socket.on ('disconnect', function (){
		console.log ('Client disconnected');
	});
};

http.listen(port);