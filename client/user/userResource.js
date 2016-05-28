(function(angular) {
	
angular.module('userResource',['ngResource'])
	.factory('User',function($resource) {
		var User = $resource('/user/:id',{id : '@id'},
		{
			save:{
						method:'POST',
						url : 'user/project/:id/user'}

				
		});
		return User;
	})
}(angular));