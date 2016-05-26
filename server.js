var express  = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyP = require('body-parser');

var Task = require(__dirname + "/app/model/task");
var User = require(__dirname + "/app/model/user");
var Project = require(__dirname + "/app/model/project");

mongoose.connect('mongodb://localhost:27017/xws');

app.use(express.static(__dirname + "/client"));
app.use(bodyP.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));


var taskRouter = express.Router();
taskRouter
.get('/:id',function (req,res,next){
  Project.findOne({ "_id" : req.params.id }, function(err,project){
      if(err) console.log(err);
	  
        Task.find({ "_id" : { $in: project.tasks }}, function(err, docs){
          if(err) throw(err);
          res.json(docs);
        })
  })
})
.get('/',function(req,res) {
	Task.find(function(err,docs) {
	 if(err) return console.error(err);
		res.json(docs);
	})
})
.post('/project/:id',function(req,res) {

	var taskic = new Task ({
		title : req.body.title,
		description : req.body.description,
		priority : req.body.priority,
		status : req.body.status
	});
	Project.findOne({"_id":req.params.id},function(err,project) {
		if(err) throw(err);
	taskic.save(function(err,task){
		if(err) throw(err);
	Project.findByIdAndUpdate(project._id,{$push:{"tasks":task._id}},function (err, entry) {
        if(err) next(err);
        res.json(entry);
      });
    });
  });
})
.delete('/:id',function(req,res,next) {
		Task.remove({
			"_id" : req.params.id
		},function(err, successIndicator) {
		    if (err) throw(err);
		    res.json(successIndicator);
		  });
});

var userRouter = express.Router();
userRouter
	.get('/',function(req,res) {
		User.find(function(err,docs) {
			if(err) console.error(err);
			res.json(docs);
		});
});
	
var projectRouter = express.Router();
	
projectRouter
	.get('/',function(req,res) {
		Project.find(function(err,docs) {
			if(err) console.error(err);
			
			res.json(docs);
		});
})
.get('/:id',function(req,res) {
		Project.findOne({
    "_id": req.params.id
  }).populate('tasks').exec(function(err, project) {
      if (err) console.log(err);
	  res.json(project);
    });
})
.post('/',function(req,res) {

	var projektic = new Project ({
		sign : req.body.sign,
		title : req.body.title,
		description : req.body.description
	})
 
   projektic.save(function(err,resp) {
        if(err) {
            console.log(err);
            res.send({
                message :'something went wrong'
            });
        } else {
            res.send({
                message:'the appointment has bees saved'
            });
        }           
})

})
.get('/:_id', function(res,req) {
	var id = req.params.id;
	console.log(id);
	Project.findOne({ '_id' : id}, function(err,doc){
		console.log(doc);
		res.json(doc);
	});
});

app.use('/tasks/', taskRouter);
app.use('/user/',userRouter);
app.use('/projects/',projectRouter);

app.listen(3000);
console.log("Server running on port 3000");










/*///*var taskic = new Task ({
		title : req.body.title,
		description : req.body.description,
		priority : req.body.priority,
		status : req.body.status
	})
 
   taskic.save(function(err,resp) {
        if(err) {
            console.log(err);
            res.send({
                message :'something went wrong'
            });
        } else {
            res.send({
                message:'the appointment has bees saved'
            });
        }           

    });*/


