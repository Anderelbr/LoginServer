var MongoDB = require('mongodb').MongoClient;
var config = require('./config.js');

function Start(socket){

    this.Confirm = function(data){
    	MongoDB.connect(config.dburl, function(err, db){

    	if (err)
    		throw err;

    	var newclient = {username: data.username, password:data.password};

	    db.collection('accounts').find(newclient).toArray(function(err, result){

	    	if (err)
	    		throw err;	
	    	
	    	if (result.length > 0){
	    		console.log ("Veryfication Success");
	    		socket.emit("ConfirmAccountRes", {message:'Veryfication Success', opcode:'0', accid:result[0].accid});
	    	}else{
	    		console.log("Sorry, this account not exist");
	    		socket.emit("ConfirmAccountRes", {message:'Sorry, this account not exist', opcode:'1'});
	    	};

	    	db.close();

	    	});
    	});
    }
}

module.exports.Start = Start;
