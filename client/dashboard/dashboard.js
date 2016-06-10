(function (angular){
	angular.module('dashboard',['ngRoute','userResource',])
	.controller('dashboardCtrl',function($scope,$rootScope,User,Project,Task,$http,$location){
     	
     	var loadDash = function() { 
     		$scope.Task = Task.query();
            $scope.user = new User();
            $scope.user2 = new User();
            $scope.project = new Project();
            $scope.currentUser = $rootScope.getCurrentUser().username;
     		    $http({method: 'GET',url:'/user/'+$scope.currentUser}).then(function successCallback(response) {
            
            $scope.user = response.data;
            console.log("\n\n")
            console.log(response.data +"<<<< Da li se odavnde moze nesto izvuci\n\n\n")
            console.log("<<<< <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n\n\n")
            $scope.Tasks = User.getTasks({id : $scope.user._id }, function(data) {
                      // success
                    console.log("\n\n")
                    console.log(data +"<<<< Da li se odavnde moze nesto izvuci\n\n\n")
                    console.log("<<<< <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n\n\n")
                    return data;
                    //  projectDetails();
                   }, function(e) {
                      // failure
                      console.log('greska');
                   });
          })
        }
        $scope.value = false;
        $scope.loadThumbs = function(id){
          $scope.Projects = User.getProjects({id : id});
          $scope.Projects.$promise.then(function(data){
          $scope.Projects = data;
          $scope.value = !$scope.value

        })
      }

     	  loadDash();

       $scope.redirect = function(id) {
              console.log('From redirect ' + id);
              Task.getProject({_id : id},
                   function(data) {
                      // success
                  $scope.project = data
                  if($scope.project._id !== undefined){

                 $location.path('/project/'+$scope.project._id);}else{
               
                 }
          //  projectDetails();
                   }, function(e) {
                      // failure
                   });
              //console.log('pope' + $scope.project._id)
              
            }
	})
}(angular))