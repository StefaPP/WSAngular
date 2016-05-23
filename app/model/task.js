var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	
	title: {
		type: String,
		required: true,
		unique : true
	},
	description: String,
	priority:{
		type: String,
		enum: ['Blocker','Critical','Major','Minor','Trivia']
	},
	createdAt : Date,
	status : {
		type: String,
		enum: ['To do','In progress','Verify','Done']
	},
	User : Schema.ObjectId

});

var Task = mongoose.model('Task',taskSchema);
module.exports = Task;