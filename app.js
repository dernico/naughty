
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , player = require('./player/mpdplayer');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/api/tunein/search', routes.tunein.search);
app.get('/api/music/streams', routes.streams.favorites);
app.get('/api/music/playStream', routes.streams.playStream);

app.post('/api/music/pause', routes.player.pause);

app.post('/api/tunein/play', routes.tunein.play);

app.listen(8000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
