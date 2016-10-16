var Login = require ('./Login.js');

var app = require('express')();
var http = require('http').Server(app);
var io = require ('socket.io')(http);

var port = process.env.PORT || 7100;

app.get('/', function(req, res){
	res.send("Server is running on port : " + port);
});

io.on ('connection', function (socket){
	
var NewClient = new Login.Start(socket);
	
socket.on ("LoginEnterReq", function(){
console.log("New connection");
socket.emit("LoginEnterRes");
});

socket.on ('ConfirmAccountReq', NewClient.Confirm);
socket.on ('disconnect', function (){
console.log ('Client disconnected');
	
});	
});

http.listen(port, function(){
	console.log("Html server is running on port : " + port);
});

