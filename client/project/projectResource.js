(function(angular) {

	angular.module('projectResource',['ngResource'])
		.factory('Project',function($resource) {
				var Project = $resource('/projects/:_id',{_id :'@_id'},
				{update:{method :'PUT'},
				getAll:{method :'GET',url:'/projects/getAll/:projectId',isArray : false}
				});
				
			return Project;
		})

}(angular));
