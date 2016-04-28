
var streamModel = function(){
	this.id;
	this.name;
	this.description;
	this.image;
	this.stream;
}

exports.tuneinToStream = function(tuninItem){
	var model = new streamModel();
	model.id = tuninItem.guide_id
	model.name = tuninItem.text;
	model.description = tuninItem.text;
	model.image = tuninItem.image;
	model.stream = tuninItem.URL;
	return model;
};

exports.favoritToStream = function(filecontent){
	var content = JSON.parse(filecontent);
	var model = new streamModel();
	model.id = content.id;
	model.name = content.name;
	model.description = content.description;
	model.image = content.image;
	model.stream = content.stream;
	return model;
}