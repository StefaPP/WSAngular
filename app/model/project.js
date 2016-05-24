var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require(__dirname + "/task"); 
var User = require(__dirname + "/user"); 
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
	tasks : [Task],
	users : [User]

});

var Project = mongoose.model('Project',projectSchema);
module.exports = Project;