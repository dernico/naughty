var fs = require('fs');
var path = require('path');
var config = require('../config');
var streamsFactory = require('../factorys/streamsFactory');
var infoFactory = require('../factorys/currentPlayingFactory');
var logger = require("../logger");
var player = require("../player/mpdplayer");

var STREAMS = [];
var encoding = "utf-8";

var readAllStreams = function(){
	config.getStreamsFolder(function(folder){
		
		fs.readdir(folder, function(err, files){
			if(err) {
				logger.log(err);
				return;
			}
			files.each(function(filename){
				var filename = path.join(folder,filename);

				var stat = fs.statSync(filename);
				if(stat.isFile()) {
					fs.readFile(filename, encoding, function(err, content){
						if(err){
							logger.log(err);
							return;
						}
						var stream = streamsFactory.favoritToStream(content);
						STREAMS.push(stream);
					});
				}
			});
		});
	});
}
readAllStreams();

exports.getFavorites = function(callback){
	callback(STREAMS);
}

exports.playStream = function(stream, callback){
	var streamModel;
	streamModel = STREAMS.where(function(s){
		return s.stream == stream;
	});

	player.playStream(stream);
	
	var info = infoFactory.favoriteToCurrentPlaying(streamModel);
	callback(info);

}