(function(angular) {
	
angular.module('userResource',['ngResource'])
	.factory('User',function($resource) {
		var User = $resource('/user/:id',{id : '@id'});
		return User;
	})
}(angular));