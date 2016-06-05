(function(angular) {

var myApp = angular.module('myApp',['ngRoute','ui.router','ngResource','task','user','project','ui.bootstrap','comment','authentication','login','signup']);

myApp
.config(config)
.run(run);
function config($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('#/');
	$stateProvider
	.state('/#',{
		templateUrl: 'index.html',
		controller: 'taskCtrl'
	})
	.state('login',{
		url:'/login',
		templateUrl:'login/login.html',
		controller:'loginCtrl'
	})
	.state('signup',{
		url:'/signup',
		templateUrl:"signup/signup.html",
		controller:"signupCtrl"
	})
	.state('home',{
		url:'/home',
		templateUrl: 'dashboard.html',
		controller : 'taskCtrl'
	})
	.state('projectTask',{
		url: '/project/:id',
		templateUrl: 'task/tasks.html',
		controller: 'projectDetailsCtrl'
	})
	.state('projects',{
		url:'/projects',
		templateUrl: 'project/project.html',
		controller: 'projectCtrl'
	})
	.state('tasks',{
		url:'/tasks',
		templateUrl: 'task/task.html',
		controller : 'taskCtrl'
	})
	.state('projectCtrlTasks',{
		url:'/projects/:id',
		templateUrl: 'task/tasks.html',
		controller: 'projectCtrl'
	})
	.state('account',{
		url:'/account',
		templateUrl: 'user/account.html',
		controller: 'userCtrl'
	})
	.state('about',{
		url:'/about',
		templateUrl: 'about.html'
	})
}
function run($rootScope, $http, $location, $localStorage, AuthenticationService, $state) {
        // postavljanje tokena nakon refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }

        // ukoliko pokušamo da odemo na stranicu za koju nemamo prava, redirektujemo se na login
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
          // lista javnih stanja
          var publicStates = ['login','signup',/*'entry',*/''];
          var restrictedState = publicStates.indexOf(toState.name) === -1;
          if(restrictedState && !AuthenticationService.getCurrentUser()){
            $state.go('login');
          }
        });

        $rootScope.logout = function () {
            AuthenticationService.logout();
        }

        $rootScope.getCurrentUser = function(){ 
        	if (!AuthenticationService.getCurrentUser()){
              return undefined;
            }
            else{
              return AuthenticationService.getCurrentUser();
            }

        }
        $rootScope.getCurrentUserRole = function () {
            if (!AuthenticationService.getCurrentUser()){
              return undefined;
            }
            else{
              return AuthenticationService.getCurrentUser().role;
            }
        }
        $rootScope.isLoggedIn = function () {
            if (AuthenticationService.getCurrentUser()){
              return true;
            }
            else{
              return false;
            }
        }
        $rootScope.getCurrentState = function () {
					console.log($state.current.name);
          return $state.current.name;
        }


};

}(angular));
