(function(angular) { 
	angular.module('task',['taskResource'])
		.controller('taskCtrl',function($scope,Task) {
			var load = function () {
				$scope.Task = Task.query();
				$scope.task = new Task();
			}
			
			load();
		
		$scope.addTask = function() {
			Task.save($scope.task);
			console.log($scope.task._id);
			load();
		};

		})
}(angular));


