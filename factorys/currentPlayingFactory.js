

var currentPlaying = function(){
	this.title;
	this.artist;
	this.album;
	this.cover;
}


exports.favoriteToCurrentPlaying = function(favorite){
	var info = new currentPlaying();
	info.title = favorite.title;
	info.artist = "not available";
	info.cover = favorite.image;
	info.album = "Stream"
}