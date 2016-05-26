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
	updatedAt: Date,
	status : {
		type: String,
		enum: ['To do','In progress','Verify','Done']
	},
	createdBy : String

});

taskSchema.pre('save',function(next){
	var currentDate = new Date();

  // postavimo trenutni datum poslednju izmenu
  this.updatedAt = currentDate;

  // ako nije postavljena vrednost za createdAt, postavimo je
  if (!this.createdAt)
    this.createdAt = currentDate;

  // predjemo na sledecu funckiju u lancu
  next();
});

var Task = mongoose.model('Task',taskSchema);
module.exports = Task;