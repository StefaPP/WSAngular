(function (angular){
	angular.module('dashboard',['ngRoute','userResource'])
	.controller('dashboardCtrl',function($scope,$rootScope,User,Project,Task,$http){
     	
     	var loadDash = function() { 
     		$scope.Task = Task.query();
            $scope.currentUser = $rootScope.getCurrentUser().username;
     		console.log($scope.currentUser);
     		 $http({method: 'GET',url:'/user/'+$scope.currentUser}).then(function successCallback(response) {
    		$scope.user = response.data;
            console.log($scope.user);
            })
        }
     	loadDash();
	})
}(angular))