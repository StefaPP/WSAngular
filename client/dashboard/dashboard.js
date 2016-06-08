(function (angular){
	angular.module('dashboard',['ngRoute','userResource',])
	.controller('dashboardCtrl',function($scope,$rootScope,User,Project,Task,$http){
     	
     	var loadDash = function() { 
     		$scope.Task = Task.query();
            $scope.user = new User();
            $scope.user2 = new User();
        
            $scope.currentUser = $rootScope.getCurrentUser().username;
     		$http({method: 'GET',url:'/user/'+$scope.currentUser}).then(function successCallback(response) {
            
            $scope.user = response.data;
            $scope.Tasks = User.getTasks({id : $scope.user._id }, function(data) {
                      // success
                    console.log(data)
                    return data;
                    //  projectDetails();
                   }, function(e) {
                      // failure
                      console.log('greska');
                   });

            })

        }
     	loadDash();
	})
}(angular))