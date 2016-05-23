(function(angular) {
	
angular.module('user',['userResource'])
	.controller('userCtrl',function($scope,User) {
		var loadUsers = function() {
			$scope.Users = User.query();
			$scope.user =  new User();

		}
		loadUsers();
	})
}(angular));