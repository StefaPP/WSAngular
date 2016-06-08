(function(angular) {
angular.module('userResource',['ngResource'])
 	.factory('User',function($resource) {
		var User = $resource('/user/:id',{id :'@id'},
		{
     	save : {method:'POST',url : '/user/project/:projectid/userId/:id'},
		deleteUser : { method:'delete',url:"/user/:id/project/:projectId"},
		getUsers: {method:'GET',url:'/user/users/:taskId',isArray:true},
		getTasks: {method: 'GET', url:'/user/tasks/:id',isArray:true}
		}
		
		);
		return User;
	})
}(angular));