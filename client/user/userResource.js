(function(angular) {
angular.module('userResource',['ngResource'])
 	.factory('User',function($resource) {
		var User = $resource('/user/:id',{id :'@id'},
		{
     	save : {method:'POST',url : '/user/project/:projectid/userId/:id'},
		deleteUser : { method:'delete',url:"/user/:id/project/:projectId"},
		getUsers: {method:'GET',url:'/user/users/:taskId',isArray:true},
		getTasks: {method: 'GET', url:'/user/tasks/:id',isArray:true},
		findUsers : {method: 'GET', url:'/user/project/:proja',isArray:true},
		getProjects:{method: 'GET', url:'/user/projects/:id',isArray:true}
		}
		
		);
		return User;
	})
}(angular));


/*
.get('/project/:proja',function(req,res) {
    Project.findOne({"_id" : req.params.proja},function(err,project) {
      console.log("\n\n projekat " + project  + "\n\n");
      if(err) throw(err);
		User.find({"_id" :{ $nin: project.users }},{function(err,users) {
      console.log(users + " <---------- korisnici ")
			if(err) console.error(err);
			res.json(users);
    }
		})
  })
})*/