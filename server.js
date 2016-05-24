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

var proj1 = new Project({
	sign : 'XWS',
	title : "Ws projekat",
	description : 'bleja'
});

proj1.save();


var proj2 = new Project({
	sign : 'PIF',
	title : "Poslovna projekat",
	description : 'smor'
});

proj2.save();

var proj3 = new Project({
	sign : 'SOK',
	title : "SOK projekat",
	description : '...'
});

proj3.save();

console.log(proj1);

var user1 = new User ({
	
	username:'kuronja',
	password:'kuronjic',
	role : 'dev'
});
	user1.save();
var user2 = new User ({
	
	username:'kuronja1',
	password:'kuronjic1',
	role : 'spremacica'
});

	user2.save();
var user3 = new User ({
	
	username:'kuronja2',
	password:'kuronjic2',
	role : 'leader'
});
	
	user3.save();

var task = new Task({
	title : 'Kurac',
	description: 'rac',
	priority : 'Blocker',
	status : 'To do'
});

task.save();

var task1 = new Task({
	title : 'Kurac1',
	description: 'rac1',
	priority : 'Critical',
	status : 'In progress'
});

task1.save();

var task2= new Task({
	title : 'Kurac2',
	description: 'rac2',
	priority : 'Major',
	status : 'Done'
});

task2.save();

var taskRouter = express.Router();
taskRouter
 .get('/',function(req,res) {
	Task.find(function(err,docs) {
	 if(err) return console.error(err);
		res.json(docs);
	});
})
.post('/',function(req,res) {

	var taskic = new Task ({
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
.post('/',function(req,res) {

	var projektic = req.body;
	console.log(projektic); 

	/*new Project ({
		sign : req.body.sign,
		title : req.body.title,
		description : req.body.description,
		Task : req.body.task.id
	})*/
 
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

    });


})

app.use('/tasks/', taskRouter);
app.use('/user/',userRouter);
app.use('/projects/',projectRouter);

app.listen(3000);
console.log("Server running on port 3000");













