var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require(__dirname + '/project');
var taskSchema = new Schema({
	
	title: {
		type: String,
		required: true,
		unique : true
	},
	description: String,
	priority:{
		type: String,
		enum: ['Blocker','Critical','Major','Minor','Trivial']
	},
	createdAt : Date,
	status : {
		type: String,
		enum: ['To do','In progress','Verify','Done']
	},
	project : [Project]
});

var Task = mongoose.model('Task',taskSchema);
module.exports = Task;