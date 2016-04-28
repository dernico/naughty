var tuneinService = require('../services/tunein');
var streamService = require('../services/streams');
var playerService = require('../player/mpdplayer');
var logger = require('../logger');
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
  res.sendfile('public/index.html', {root: __dirname });
};

var player = {};
player.pause = function(req, res){
	playerService.stop();
	res.json({});
}
player.play = function(){};


exports.player = player;

var streams = {};
streams.favorites = function(req, res){
	streamService.getFavorites(function(favorites){
		res.json({streams: favorites});
	});
}
streams.playStream = function(req, res){
	streamService.playStream(req.query.stream, function(info){
		res.json(info);
	});
}
exports.streams = streams;

var tunein = {};
tunein.search = function(req, res){
	var searchterm = req.query.search;
	tuneinService.search(searchterm, function(result){
		res.json({result: result});
	});
}
tunein.play = function(req, res){
	var tuneinModelString = req.body.item;
	tuneinService.play(tuneinModelString, function(result){
		res.json(result);
	});
}

exports.tunein = tunein;