(function (angular) {
angular.module('taskResource',['ngResource'])
		.factory('Task',function($resource){
			var Task = $resource('/tasks/:id',{id:'@id'});
			return Task;
})

}(angular));

