(function (angular) {
	angular.module('signup',[])
	.controller('signupCtrl', function($scope,$http){
		$scope.user={};
		$scope.signupForm=function () {
      console.log('from signup controller');
      console.log($scope.user)
      $http.post('api/users/signup',$scope.user);
  }

	});
}(angular));
