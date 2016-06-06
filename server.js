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
		if(err) throw(err);
	User.findOne({"_userId": req.params.userId},function(err,user) {
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
  console.log(req.body.sign + " " + req.body.title)
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
.post('/:id', function(req,res){
  console.log(req.body.sign + " " + req.body.title)
  Project.findOneAndUpdate({ _id :req.params.id }, { $set: { sign : req.body.sign , title : req.body.title,description :req.body.description }}, { new: true }, function(err, doc) {
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
.put('/:id', function(req, res, next) {
   
    Project.findOne({
      "_id": req.params.id
    }, function(err, project) {
      if (err) throw(err);
      /*var newProject = req.body;
      console.log(newProject + " <--------------");
*/
      
     var newProject = new Project({
       sign : req.body.sign,
       title : req.body.title,
       description : req.body.description
     });       

     console.log(newProject + " <--------------------");

     
     project.save(function(err, project) {
     if (err) throw(err);
      res.json(project);
      });
    })
})    


var commentRouter = express.Router();

commentRouter
.post('/:id',function(req, res, next) {

  var comment = new Comment({
  		signedBy : req.body.signedBy,
      text : req.body.text
  });

  console.log(req.body.signedBy + " POTPISO");

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
     console.log(req.params.id);
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
app.use('/api/users',loginRouter)
app.listen(3000);
console.log("Server running on port 3000");
