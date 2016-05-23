(function(angular) { 

var myApp = angular.module('myApp',['ngRoute','ngResource','task','user']);
myApp.config(function($routeProvider) {
	$routeProvider
	.when('/#',{
		templateUrl: 'index.html',
		controller: 'taskCtrl'
	})
	.when('/home',{
		templateUrl: 'dashboard.html',
		controller : 'taskCtrl'
	})
	.when('/projects',{
		templateUrl: 'task/projects.html',
		controller: 'taskCtrl'
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

