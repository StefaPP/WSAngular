(function (angular) {
angular.module('taskResource',['ngResource'])
		.factory('Task',function($resource){
			var Task = $resource('/tasks/:_id',{ _id:'@_id'},
				{
					update:{
						method : 'PUT'
					},
					save:{
						method:'POST',
						url : 'tasks/project/:projectId'
					},
					deleteTask:{
						method:'DELETE',
						url : 'tasks/:_id/project/:projectId'
					}
				}
				);
	        return Task;
})

}(angular));

