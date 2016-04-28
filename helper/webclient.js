var http = require('http');
var logger = require('../logger');


function get(url, callback){
	/*var options = {
		host: host,
		port: 80,
		path: path
	};
	*/
	logger.log("Waiting for " + url + " to responde");
	http.get(url, function(resp){

		var data = "";
		resp.on('data', function(chunk){
			data += chunk;
		});
		resp.on('end', function(){
			callback(data);
		});

	}).on("error", function(e){
		logger.log("Got error: " + e.message);
		callback();
	});
}

exports.get = get;