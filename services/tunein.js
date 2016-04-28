var webclient = require('../helper/webclient');
var urlencode = require('querystring');
var prototypes = require('../helper/prototypes');
var factory = require('../factorys/streamsFactory');
var logger = require('../logger');
var player = require('../player/mpdplayer');

var tuneInUri = 'http://opml.radiotime.com';

function search(searchterm, callback){
	if (!searchterm){
		logger.log("no searchstring provided");
		return;
	}

	var serchterm = urlencode.escape(searchterm);

	webclient.get(tuneInUri + "/Search.ashx?render=json&query="+serchterm, 
		function(result){

			result = JSON.parse(result);
			var status = result.head.status;

			logger.log("got a result status: " + status);
			
			var streams = [];

			result.body.each(function(item){
				streams.push(factory.tuneinToStream(item));
			});

			logger.log("send streams back");
			callback(streams);
		}
	);

}


/*
{ "head": {	"status": "200"}, "body": [
 { "element" : "audio", 
"url": "http://stream.laut.fm/rapkings",
"reliability": 99,
"bitrate": 128,
"media_type": "mp3",
"position": 0,
"guide_id": "e10221152",
"is_direct": true }] }

*/
var play = function(streamModelString, callback){
	var streamModel = JSON.parse(streamModelString);
	var url = tuneInUri + "/Tune.ashx?render=json&id=" + streamModel.id;
	webclient.get(url, function(result){
		logger.log(result);
		var json = JSON.parse(result);
		if(json.body.length > 0) {
			var streamUrl = json.body[0].url;
			streamModel.stream = streamUrl;
			player.playStream(streamModel.stream);
			callback(streamModel);
		}
	});
}

exports.search = search;
exports.play = play;