(function(angular) {

	angular.module('project',['projectResource'])
		.controller('projectCtrl',function($scope,Project,Task) {
				var loadProject = function() {
					$scope.Project = Project.query();
					$scope.project = new Project();
					$scope.Task = Task.query();
					$scope.task = new Task();
				}

				loadProject();

				$scope.addProject = function(id) {
					Project.save($scope.project);
					loadProject();
				};


		})

}(angular));