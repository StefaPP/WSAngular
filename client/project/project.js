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

				$scope.addProject = function(id) {
					Project.save($scope.project);
					loadProject();
				};

				$scope.details = function(project) {
					$location.path('/project/'+project._id);
				}

		}).controller('projectDetailsCtrl',function($scope,Task,$routeParams,Project){
			
			$scope.task = new Task();
			var proj_id = $routeParams.id;
			console.log(proj_id);
			$scope.project = Project.get({ _id : proj_id});
			

			var loadTasks = function(id) {
				$scope.Tasks = Task.query({ _id : id});
			}

			$scope.value = false;

			$scope.show = function(id) {
			$scope.value = $scope.value ? false : true;

		}
			
			$scope.addTask = function(id) {
			$scope.task.$save({ 'projectId' : id}); 
			$scope.task = new Task();
			$location.path('/project/'+proj_id);
	  }

			//showTasks();
			loadTasks();

	
		});
}(angular));