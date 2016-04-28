Array.prototype.each = function(callback){
	if(!callback) return;
	for(var i = 0; i < this.length; i++){
		callback(this[i]);
	}
}

Array.prototype.where = function(callback){
	if(!callback) return;
	for(var i = 0; i < this.length; i++){
		if(callback(this[i])){
			return this[i];
		}
	}
}