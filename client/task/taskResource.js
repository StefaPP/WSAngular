(function (angular) {
angular.module('taskResource',['ngResource'])
		.factory('Task',function($resource){
			var Task = $resource('/tasks/:_id',{_id:'@_id'});
			return Task;
})

}(angular));

