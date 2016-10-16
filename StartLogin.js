

var app = require('express')();
var http = reqiure('http').Server(app);
var io = require ('socket.io')(http);

var port = process.env.PORT || 7100;

app.get('/', function(req, res){
	app.send("Server is running on port : " + port);
	InitializeServer();
});

//Start Server
var InitializeServer = function () {
	//Receive Connections
	io.on ('connection', function (socket){
		var NewClient = new Login.Start(socket);
		StartEvents(NewClient);	
	});
};

function StartEvents (NewClient){
	socket.on ("LoginEnterReq", function(){
		console.log("New connection");
		socket.emit("LoginEnterRes");
	});

	socket.on ('ConfirmAccountReq', NewClient.Confirm);
	socket.on ('disconnect', function (){
		console.log ('Client disconnected');
	});
};

http.listen(port, function(){
	console.log("Html server is running on port : " + port);
});
