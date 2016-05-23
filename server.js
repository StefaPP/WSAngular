var express  = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyP = require('body-parser');

var Task = require(__dirname + "/app/model/task");
var User = require(__dirname + "/app/model/user");

mongoose.connect('mongodb://localhost:27017/xws');

app.use(express.static(__dirname + "/client"));
app.use(bodyP.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));


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
		console.log(docs);
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
			console.log(docs);
			res.json(docs);
		});
})
	

app.use('/tasks/', taskRouter);
app.use('/user/',userRouter);
/*
app.get('/Korisnik',function(req,res) {

	db.Korisnik.find(function(err,docs) {
		console.log(docs)
		res.json(docs);
	});
});

app.post('/Project',function(req,res){
	console.log(req.body);
	db.Project.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

app.post('/Korisnik',function(req,res){
	console.log(req.body);
	db.Korisnik.insert(req.body,function(err,doc){
		res.json(doc);
	});
});


app.delete('/Project/:id', function(req,res) {
	var id = req.params.id;
	console.log(id);
	db.Project.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});


app.delete('/Korisnik/:id', function(req,res) {
	var id = req.params.id;
	console.log(id);
	db.Korisnik.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});



app.get('/Projekat/:id', function(res,req) {
	var id = req.params.id;
	console.log(id);
	db.Projekat.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});
*/
app.listen(3000);
console.log("Server running on port 3000");













