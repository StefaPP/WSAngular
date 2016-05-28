(function(angular) {

	angular.module('project',['projectResource','ngRoute'])
		.controller('projectCtrl',function($scope,Project,User,$location) {
				$scope.location = $location;
				var loadProject = function() {
					$scope.Project = Project.query();
					$scope.project = new Project();
					$scope.User = User.query();
					$scope.user = new User();
				}

				$scope.value = false;
				$scope.show = function(id) {
				$scope.value = $scope.value ? false : true;
					
				}

				$scope.go = function() {
					$location.url('/tasks')
				};

				loadProject();

				$scope.addProject = function() {
					Project.save($scope.project);
					loadProject();
				};


				$scope.details = function(project) {
					$location.path('/project/'+project._id);
				}

		}).controller('projectDetailsCtrl',function($scope,Task,User,$routeParams,Project,Comment){
			
			
			var projectDetails = function (){
			var proj_id = $routeParams.id;
	
			$scope.task = new Task();
			$scope.user = new User();
			$scope.project = Project.get({ _id : proj_id});
			$scope.User = User.query();
			$scope.comment = new Comment();
			$scope.Comments = new Comment();

			}

			projectDetails();

			$scope.value = false;

			$scope.show = function(id) {
			$scope.value = $scope.value ? false : true;

		}
			
		    $scope.value2 = false;
			$scope.show2 = function() {
			$scope.value2 = $scope.value2 ? false : true;
				
		}
			
			$scope.commentId = null;
			$scope.comment = function(id) {
			$scope.commentId = $scope.id ? null : id;
			$scope.Comments = Comment.query({id : id });
			console.log(id);
			}	

		    $scope.addComment = function(id) {
		    $scope.comment = new Comment();
			$scope.comment.$save({ id : id},projectDetails);
	 	}


			$scope.addTask = function(id) {
			$scope.task.$save({ projectId : id},projectDetails); 
			$scope.task = new Task();
	  }


		    $scope.deleteTask  = function(task) {
		  	Task.delete({ _id : task._id},projectDetails);
		  }

		  	$scope.addUserToProject = function(projectId,userId) {
		  	$scope.user.$save({ id : projectId , userId : userId},projectDetails);
		  	
		  	}
	
		}).controller('DropdownCtrl', function ($scope, $log) {
			  $scope.items = [
			    'The first choice!',
			    'And another choice for you.',
			    'but wait! A third!'
			  ];

			  $scope.status = {
			    isopen: false
			  };

			  $scope.toggled = function(open) {
			    $log.log('Dropdown is now: ', open);
			  };

			  $scope.toggleDropdown = function($event) {
			    $event.preventDefault();
			    $event.stopPropagation();
			    $scope.status.isopen = !$scope.status.isopen;
			  };

			  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});
}(angular));