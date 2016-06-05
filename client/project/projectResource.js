(function(angular) {

	angular.module('projectResource',['ngResource'])
		.factory('Project',function($resource) {
				var Project = $resource('/projects/:_id',{_id :'@_id'},
			
				{update:{method :'PUT'}});
			return Project;
		})

}(angular));
