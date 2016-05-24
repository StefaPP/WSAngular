var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
	
	sign : {
		type : String,
		required : true,
		unique : true
	},
	title: {
		type: String,
		required: true,
		unique : true
	},
	description: String,
	Task : Schema.ObjectId,
	User : Schema.ObjectId

});

var Project = mongoose.model('Project',projectSchema);
module.exports = Project;