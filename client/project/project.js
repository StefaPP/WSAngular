(function(angular) {

	angular.module('project',['projectResource'])
		.controller('projectCtrl',function($scope,Project,User) {
				var loadProject = function() {
					$scope.Project = Project.query();
					$scope.project = new Project();
					$scope.User = User.query();
					$scope.user = new User();

				}

				
				$scope.value = false;
				$scope.show = function(id) {
					$scope.value = $scope.value ? false : true;
					$scope.project = Project.$get(project.id);
				}

				loadProject();

				$scope.addProject = function(id) {
					Project.save($scope.project);
					loadProject();
				};
		})
}(angular));