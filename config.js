var fs = require('fs');


var getStreamsFolder = function(callback){
	callback("/home/dev/dev/python/mediaschlingel/Streams/");
}

exports.getStreamsFolder = getStreamsFolder;