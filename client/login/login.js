(function (angular) {
	angular.module('login',['authentication'])
	.controller('loginCtrl', function($scope, AuthenticationService){
		$scope.user={};
		$scope.login=function () {
			console.log($scope.user.username + " from loginForm");
			AuthenticationService.login($scope.user.username,$scope.user.password,loginCbck);
		};
		function loginCbck(success) {
			if (success) {
				console.log('success!');
			}
			else{
				console.log('failure!');
			}
		}
	});
}(angular));
