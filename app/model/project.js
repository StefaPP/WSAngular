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
	tasks : [{ type: Schema.Types.ObjectId, ref: 'Task'}],
	users : [{ type: Schema.Types.ObjectId, ref: 'User'}]

});

var Project = mongoose.model('Project',projectSchema);
module.exports = Project;