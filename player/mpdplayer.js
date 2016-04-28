var mpd = require('mpd')
    , cmd = mpd.cmd
    , logger = require('../logger');


var client = mpd.connect({
  port: 6600,
  host: 'localhost',
});

client.on('ready', function() {
	logger.log("mpd player is ready");
});

client.on('system', function(name) {
	//logger.log("mpd player got an update", name);
});

client.on('system-player', function() {
	/*logger.log("mpd player got system-player message");
	client.sendCommand(cmd("status", []), function(err, msg) {
		if (err) throw err;
		logger.log(msg);
	});*/
});


var playStream = function(stream){
	logger.log("try playing stream: " + stream);
	logger.log("clear playlist");
	client.sendCommand("clear", function(err, msg){
		if(err){
			logger.log("error clearing the playlist: " + err);
			return;
		}
		logger.log("cleaning message: " + msg);

		client.sendCommand(cmd("add",[stream]), function(err, msg){
			if(err){
				logger.log("error adding stream " + stream + " to playlist");
				return;
			}
			logger.log("adding message: " + msg);
			client.sendCommand("play", function(err, msg){
				if(err){
					logger.log("error playing song in playlist");
					return;
				}
				logger.log("play message: " + msg);

			});

		});
	});
}

var stop = function(){
	logger.log("stop playing");
	client.sendCommand("stop", function(err, msg){
		if(err){
			logger.log("error stop playing: " + err);
			return;
		}
		logger.log("stopped playing: " +msg);
	});
}

exports.playStream = playStream;
exports.stop = stop;