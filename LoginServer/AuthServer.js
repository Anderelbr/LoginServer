var Login = require('./Login.js');
var port = process.env.PORT || 7100;

var app = require('express')();
var http = require('http').Server(app);
var io = require ('socket.io');

var serverunning = false;

function StartEvents (socket, NewClient){
	socket.on ("LoginEnterReq", function(){	
		socket.emit("LoginEnterRes");
        console.log("New connection");
	});

	socket.on ('ConfirmAccountReq', NewClient.Confirm);
	socket.on ('disconnect', function (){
		console.log ('Client disconnected');
	});
}

var InitializeServer = function () {
	
    if(!serverunning){
    
	io = io.listen(http, false);

	io.on ('connection', function (socket){
		var NewClient = new Login.Start(socket);
		StartEvents(socket,NewClient);	
	});

    serverunning = true;
	console.log('Server is running on ' + port);
    };
};

app.get('/', function (req, res){
	res.send("<h1>Server is running on " + port + "</h1>");
	InitializeServer();
});

http.listen(port);