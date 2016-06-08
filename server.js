var express  = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyP = require('body-parser');
var passport= require('passport');
var jwt = require('jwt-simple');
var Task = require(__dirname + "/app/model/task");
var User = require(__dirname + "/app/model/user");
var Project = require(__dirname + "/app/model/project");
var Comment = require(__dirname + "/app/model/comment");
var config = require(__dirname+'/config/database');

require(__dirname + '/config/passport')(passport);

mongoose.connect(config.database);

app.use(express.static(__dirname + "/client"));
app.use(bodyP.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules',express.static(__dirname + '/node_modules'));

var loginRouter = express.Router(); // koristimo express Router
// kreira novi user account (POST http://localhost:8080/api/signup)
loginRouter.post('/signup', function(req, res) {
    
    if(req.body.username === 'pop' && req.body.password === 'car'){

      var newUser = new User({
        username : req.body.username,
        password : req.body.password,
        role : 'admin'  
        
      })
    }else{
          var newUser = new User({
          username : req.body.username,
          password : req.body.password,
          role : 'user'
      })
    }

   

    newUser.save(function(err) {
      if (err) throw(err)
      else  res.json({success: true, msg: 'Successful created new user.'});
    });
  
})
.post('/authenticate', function(req, res) {
  console.log('from /authenticate' + " " + req.body.username + " " + req.body.password);
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      console.log('nije nasao')
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      console.log('provera da li se pasword poklapa')
      // proveri da li se password poklapa
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // ako je pronadjen user i poklapa se password kreira token
          // da li ceo user treba da bude u tokenu?
          var token = jwt.encode(user, config.secret);
          // vraca informaciju kao JWT token
          var resObject = { success: true, token: 'JWT ' + token };
          res.json(resObject);
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
})
.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

var taskRouter = express.Router();
taskRouter
.post('/upd/:_id',function(req,res,next){
  console.log(req.params._id + " <----------------")
  Task.findOneAndUpdate({ _id :req.params._id }, { $set: {  title : req.body.title,
    description : req.body.description,
    priority : req.body.priority,
    status : req.body.status}}, { new: true }, function(err, doc) {
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
.get('/upd/:id',function(req,res) {
Task.findOne({ _id : req.params.id},function(err, task){
        if (err) throw(err);
          res.json(task);
        })
})
/*.get('/users/:id',function(res,req){
  console.log(req.params.id + " <--------STA IMAM ODJE");
  Task.findOne({ "_id" : req.params.id})
        .populate('comments')
        .populate('users')
        .exec(function(err, task){
         if (err) throw(err);
          res.json(task);
        })
})*/
.get('/:id',function (req,res,next){
  Project.findOne({ "_id" : req.params.id }, function(err,project){
      if(err) console.log(err);
        Task.find({ "_id" : { $in: project.tasks }})
        .populate('comments')
        .populate('users')
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
.post('/project/:projectId',function(req,res){
    
    var taskic = new Task ({
    title : req.body.title,
    description : req.body.description,
    priority : req.body.priority,
    status : req.body.status,
  });
    Project.findOne({"_id":req.params.projectId},function(err,project) {
    if(err) throw(err);
    taskic.save(function(err,task){
        if(err) throw(err);
    Project.findByIdAndUpdate(project._id,{$push:{"tasks":task._id}},function (err, entry) {
        if(err) next(err);
        res.json(entry);
      });
    })
  })
})
.post('/project/:id/userId/:userId',function(req,res) {

	var taskic = new Task ({
		title : req.body.title,
		description : req.body.description,
		priority : req.body.priority,
		status : req.body.status,
	});
  console.log(req.params.userId + "<___--")

	Project.findOne({"_id":req.params.id},function(err,project) {
		if(err) throw(err);
	taskic.save(function(err,task){

  Task.findByIdAndUpdate(taskic._id,{$push:{"users":req.params.userId }},function (err, entry) {
        if(err) throw(err);
  User.findByIdAndUpdate(req.params.userId,{$push:{"tasks": taskic._id}},function (err, entry) {
        if(err) throw(err);
      })   
  })
		if(err) throw(err);
	Project.findByIdAndUpdate(project._id,{$push:{"tasks":task._id}},function (err, entry) {
        if(err) next(err);
        res.json(entry);
      });
    });
  });
})
.delete('/:_id/project/:projectId',function(req,res,next) {
  console.log(req.params.projectId + "<------- ProjectID \n" + req.params._id + "<---- TaskID")
  Task.remove({"_id" : req.params._id} , function(err,ress){
    if(err) throw(err);
	Project.findByIdAndUpdate(req.params.projectId,{$pull:{"tasks" : req.params._id}},function(err,project) {
    if(err) throw(err);
    res.json(project);
   })
});
});

var userRouter = express.Router();
userRouter
.get('/:user',function(req,res){
  console.log(req.params.user + "<--- ovog trazim \n")
  User.find({"username" : req.params.user},function(err,user){
    console.log(user + "<--- ovog sam ")
    if(err) throw(err);
    res.json(user);
  })

})
.get('/',function(req,res) {
		User.find(function(err,docs) {
			if(err) console.error(err);
			res.json(docs);
		});
})
.get('/users/:taskId',function(req,res) {

  Task.findOne({"_id" : req.params.taskId},function(err,task){
    if(err) throw(err);
    User.find({"_id" : {$in:task.users}},function(err, docs){
          if(err) throw(err);
          res.json(docs);
      })
   })
}).get('/:id',function(req,res) {
    User.findOne({ _id: req.params.id},function(err,docs) {
      if(err) console.error(err);
      res.json(docs);
    })
  })
.post('/project/:projectid/userId/:id',function(req,res) {
	Project.findOne({"_id" : req.params.projectid},function(err,project) {
		if(err) throw(err);
	User.findByIdAndUpdate({"_id": req.params.id},{$push:{"projects" : project._id}},function(err,user) {
		if(err) throw(err);
	Project.findByIdAndUpdate(project._id,{$push:{"users" : user._id}},function(err, entry) {
        if(err) throw(err);
        res.json(entry);

			});
		})
	})  
})
.delete('/:id/project/:projectId',function(req,res){ 
  console.log(req.params.projectId + " <----- \n" + req.params.id + " <---------")
  Project.findByIdAndUpdate(req.params.projectId,{$pull:{"users" : req.params.id}},function(err,project) {
  User.findByIdAndUpdate(req.params.id,{$pull:{"projects" : req.params.projectId}},function(err,project) {

    if(err) throw(err);
  })
    if(err) throw(err);
    res.json(project);
  })
});


var projectRouter = express.Router();

projectRouter.get('/',function(req,res) {
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
})
.put('/:_id', function(req,res){
  Project.findOneAndUpdate({ _id :req.params._id }, { $set: { sign : req.body.sign , title : req.body.title,description :req.body.description }}, { new: true }, function(err, doc) {
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
.delete('/:_id',function(req,res){
  Project.remove({"_id" : req.params._id},function(err,res){ 
    if(err) throw(err);
  })
});


/*
.put('/:id', function(req, res, next) {
   
    Project.findOne({
      "_id": req.params.id
    }, function(err, project) {
      if (err) throw(err);
      /*var newProject = req.body;
      console.log(newProject + " <--------------");

      
     var newProject = new Project({
       sign : req.body.sign,
       title : req.body.title,
       description : req.body.description
     });       

     
     project.save(function(err, project) {
     if (err) throw(err);
      res.json(project);
      });
    })
})    
*/

var commentRouter = express.Router();

commentRouter
.post('/:id',function(req, res, next) {

  var comment = new Comment({
  		signedBy : req.body.signedBy,
      text : req.body.text
  });

  Task.findOne({"_id":req.params.id},function (err, entry) {

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
.delete('/:id/task/:taskId',function(req,res) {
  Comment.remove({"_id":req.params.id},function (err, successIndicator) {
    if(err) throw(err);
   Task.findByIdAndUpdate(req.params.taskId,{$pull:{"comments" : req.params.id}},function(err,task) {
    if(err) throw(err);
    res.json(task);
   })
});
   })
.get('/:id',function (req,res,next){
  Task.findOne({ '_id' : req.params.id }, function(err,task){
      if(err) next (err);
        Comment.find({ '_id' : { $in: task.comments}},function(err, docs){
          res.json(docs);
        })
    })
})
.put('/:id/task/:taskId',function(req,res,next) {
  console.log(req.params.taskId + "<=--------------");

})
.post('/upd/:id', function(req,res){
  Comment.findOneAndUpdate({ _id :req.params.id }, { $set: {  text : req.body.text,
    updatedAt : req.body.updatedAt}}, { new: true }, function(err, doc) {
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
.get('/upd/:id', function(req,res,next){
      
      Comment.findOne({ _id : req.params.id},function(err, comment){
        if (err) throw(err);
          console.log("from CommentGEt " + comment);
          res.json(comment);
        })
});

app.use('/tasks/', taskRouter);
app.use('/user/',userRouter);
app.use('/projects/',projectRouter);
app.use('/comments/',commentRouter);
app.use('/api/users',loginRouter)
app.listen(3000);
console.log("Server running on port 3000");
