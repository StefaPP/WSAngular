(function (angular) {
angular.module('taskResource',['ngResource'])
		.factory('Task',function($resource){
			var Task = $resource('/tasks/:_id',{ _id:'@_id'},{
			update:{method : 'PUT'},
			save:{method:'POST',url : 'tasks/project/:projectId'},
			saveUser:{method:'POST',url : 'tasks/project/:projectId/userId/:_id'},
			deleteTask:{method:'DELETE',url : 'tasks/:_id/project/:projectId'},
			getTask:{method:'GET',url: '/tasks/upd/:id'},
			oldTasks:{method:'get',url:'/tasks/oldTasks/:_id',isArray:true},
			taskUpdate : { method :'POST',url : '/tasks/upd/:_id',_id:'@_id'},
			getProject : {method : 'GET', url : '/tasks/taskFromProject/:_id'}
		});
	        return Task;
})

}(angular));

