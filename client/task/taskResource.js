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
						url : 'tasks/project/:projectId/userId/:userId'
					},
					deleteTask:{
						method:'DELETE',
						url : 'tasks/:_id/project/:projectId'
					},
					getTask:{method:'GET',
							 url: '/tasks/upd/:id'
							},
					taskUpdate : { method :'POST',url : '/tasks/upd/:_id',_id:'@_id'}
				}
				);
	        return Task;
})

}(angular));

