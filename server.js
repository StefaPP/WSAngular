var express  = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyP = require('body-parser');

var Task = require(__dirname + "/app/model/task");
var User = require(__dirname + "/app/model/user");
var Project = require(__dirname + "/app/model/project");
var Comment = require(__dirname + "/app/model/comment");
mongoose.connect('mongodb://localhost:27017/xws');

app.use(express.static(__dirname + "/client"));
app.use(bodyP.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));


var taskRouter = express.Router();
taskRouter
.get('/:id',function (req,res,next){
  Project.findOne({ "_id" : req.params.id }, function(err,project){
      if(err) console.log(err);
	  
        Task.find({ "_id" : { $in: project.tasks }})
        .populate('comments')
        .exec(function(err, project) {
     		 if (err) console.log(err);
	  		 res.json(project);
    });
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
})
.post('/project/:id/user',function(req,res) {
	console.log('USSSSOOOOO');
	Project.findOne({"_id" : req.params.id},function(err,project) {
		console.log(project + '   NAAAAAAAAAAAAAAAAAAAAASAOOOO GA');
		if(err) throw(err);
	User.findOne({"_userId": req.params.userId},function(err,user) {
		console.log(user + "USEEEEEEEEEEEEEEEEEEER")
		if(err) throw(err);
		console.log(project._id + "\n" + user._id);
	Project.findByIdAndUpdate(project._id,{$push:{"users":user._id}},function(err, entry) {
        if(err) throw(err);
        res.json(entry);

			});
		})
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
  }).populate('tasks')
	.populate('users')
	.exec(function(err, project) {
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

});

var commentRouter = express.Router();

commentRouter
.post('/:id',function(req, res, next) {
  console.log('commentRouter ' +  req.params.id )
  var comment = new Comment(req.body);
  console.log(comment);
  Task.findOne({"_id":req.params.id},function (err, entry) {
    console.log(entry + "  JESI LI NULL??");
    if(err) next(err);
    comment.save(function (err, comment) {
      if(err) next(err);
    	Task.findByIdAndUpdate(entry._id, {$push:{"comments":comment._id}}, function (err, entry) {
        if(err) next(err);
        res.json(entry);
      });
    });
  });
})
.delete('/:id', function (req, res, next) {
  Comment.remove({"_id":req.params.id},function (err, successIndicator) {
    if(err) next(err);
    res.json(successIndicator);
  })

})
.get('/:id',function (req,res,next){
  Task.findOne({ '_id' : req.params.id }, function(err,entry){
      if(err) next (err);
        Comment.find({ '_id' : { $in:entry.comments}},function(err, docs){
          console.log(docs);
          res.json(docs);
        })
    })
});


app.use('/tasks/', taskRouter);
app.use('/user/',userRouter);
app.use('/projects/',projectRouter);
app.use('/comments/',commentRouter);

app.listen(3000);
console.log("Server running on port 3000");
