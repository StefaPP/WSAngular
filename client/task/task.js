(function(angular) {
	angular.module('task',['taskResource'])
		.controller('taskCtrl',function($scope,Task,$window,Comment) {

			var load = function () {
				$scope.Task = Task.query();
				$scope.task = new Task();

			}

			load();

		$scope.addTask = function() {
			Task.save($scope.task);
			console.log($scope.task.id);
			load();
		};

		$scope.remove = function(task) {
			task.$delete(load);
		}
  

	})
}(angular));
