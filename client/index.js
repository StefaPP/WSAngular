(function(angular) { 

var myApp = angular.module('myApp',['ngRoute','ngResource','task','user','project']);
myApp.config(function($routeProvider) {
	$routeProvider
	.when('/#',{
		templateUrl: 'index.html'
	})
	.when('/home',{
		templateUrl: 'dashboard.html',
		controller : 'taskCtrl'
	})
	.when('/tasks',{
		templateUrl: 'task/tasks.html',
		controller: 'taskCtrl'
	})
	.when('/projects',{
		templateUrl: 'project/project.html',
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

