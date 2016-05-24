(function(angular) {

	angular.module('projectResource',['ngResource'])
		.factory('Project',function($resource) {
			var Project = $resource('/projects/',{ _id :'@_id'});
			return Project;
		})		

}(angular));