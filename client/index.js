(function(angular) { 

var myApp = angular.module('myApp',['ngRoute','ngResource','task','user','project','ui.bootstrap','comment']);
myApp.config(function($routeProvider) {
	$routeProvider
	.when('/#',{
		templateUrl: 'index.html'
	})
	.when('/home',{
		templateUrl: 'dashboard.html',
		controller : 'taskCtrl'
	})
	.when('/project/:id',{
		templateUrl: 'task/tasks.html',
		controller: 'projectDetailsCtrl'
	})
	.when('/projects',{
		templateUrl: 'project/project.html',
		controller: 'projectCtrl'
	})
	.when('/tasks',{
		templateUrl: 'task/task.html',
		controller : 'taskCtrl'
	})
	.when('/projects/:id',{
		templateUrl: 'task/tasks.html',
		controller: 'projectCtrl'
	})
	.when('/account',{
		templateUrl: 'user/account.html',
		controller: 'userCtrl'
	})
	.when('/about',{
		templateUrl: 'about.html'
	})
	.otherwise({
		redirectTo:'index.html'
	});

});


}(angular));

