(function(angular) {

	angular.module('project',['projectResource','ngRoute','commentResource','userResource',])
		.controller('projectCtrl',function($scope,Project,User,Task,$location,Comment) {
				$scope.location = $location;
				var loadProject = function() {
					$scope.Project = Project.query();
					$scope.project = new Project();
					
					
					console.log($scope.User);
					$scope.user = new User();
					$scope.User = User.query();
					$scope.projectUpd = new Project();

				}

				$scope.value = false;
				$scope.show = function(id) {
				$scope.value = $scope.value ? false : true;
				}

				$scope.valueForUpdate = false;
				$scope.updateProjectShow = function(id){
				console.log(id + ' updateProjectShow');
				$scope.projectUpd =  Project.get({ _id : id});
				$scope.projectUpd._id = id;
				$scope.valueForUpdate = $scope.valueForUpdate ? false : true;
				
				}

				$scope.go = function() {
					$location.url('/tasks')
				};

				loadProject();

				$scope.addProject = function() {
					Project.save($scope.project,loadProject);
				};

				$scope.updateProject = function(id) {
					console.log($scope.projectUpd.title + " " + $scope.projectUpd.description +  " updateProject")
					Project.update($scope.projectUpd,loadProject);
				}
				$scope.deleteProject = function(id){
					Project.delete({ _id : id},loadProject);
				}

				$scope.details = function(project) {
					$location.path('/project/'+project._id);
				}

		}).controller('projectDetailsCtrl',function($scope,Task,User,$stateParams,Project,Comment,$rootScope){


			var projectDetails = function (){
		
			var proj_id = $stateParams.id;
			$scope.Comment = new Comment();
			$scope.commentAdd = new Comment();
			$scope.commentUpd =new Comment();
            $scope.Users = User.query();
			$scope.task = new Task();
			$scope.user = new User();
			$scope.project = Project.get({ _id : proj_id});
			//$scope.User = new User();
		
			$scope.User = new User();
			$scope.currentUser = $rootScope.getCurrentUser().username;
            $scope.currentUser.role = $rootScope.getCurrentUserRole();
        
        	}

			projectDetails();

			$scope.value = false;

			$scope.show = function(id) {
			$scope.value = $scope.value ? false : true;

		}
				

		    $scope.value2 = false;
			$scope.show2 = function() {
			$scope.value2 = $scope.value2 ? false : true;

		}

			$scope.commentId = null;
			$scope.comment = function(id) {
			$scope.commentId = $scope.id ? null : id;
			$scope.Comments = Comment.query({ id : id });

		}

		  $scope.addComment = function(id) {

		  		$scope.commentAdd.signedBy = $rootScope.getCurrentUser().username;
				$scope.commentAdd.$save({ id : id},
                   function(data) {
                      // success
					$scope.Comments = Comment.query({ id : id })
					projectDetails();
					//	projectDetails();
                   }, function(e) {
                      // failure
                   });
			//	$scope.Comments = Comment.query({ id : id })
			//	projectDetails();
		}
			$scope.deleteComment = function(id,taskId){
			        Comment.deleteComment({ id : id , taskId : taskId},
                    function(data) {
                       // success
					$scope.Comments = Comment.query({ id : taskId })
					projectDetails();
					//	projectDetails();
                    }, function(e) {
                       // failure
                    });
			}

			$scope.valueForUpdateComment = false;
			$scope.updateCommentShow = function(id){
				$scope.commentUpd = Comment.commentGet({ id : id});
				$scope.commentUpd._id = id;
				$scope.valueForUpdateComment = $scope.valueForUpdateComment ? false : true;
			}	

			$scope.updateComment = function(taskId,id) {
					$scope.valueForUpdateComment = false;
					Comment.commentPost({id : id},$scope.commentUpd,
                   function(data) {
                      // success
                    $scope.Comments = Comment.query({ id : taskId });
					projectDetails();
					//	projectDetails();
                   }, function(e) {
                      // failure
                   });
				}

			$scope.addTask = function(id,userId) {
			console.log(userId);
			
			if(userId == null){
				console.log("USOOO SAM ODJE")
				$scope.task.$save({ projectId : id},projectDetails);
			}
			else{
				console.log("ONDA NMG ODJE UCI")
			$scope.task.$saveUser({ projectId : id , _id : userId},projectDetails);
		
			$scope.task = new Task();
	 	 }
	}

		    $scope.deleteTask  = function(task,project) {
		  	Task.deleteTask({ _id : task._id , projectId : project._id},projectDetails);
		  }

		  	$scope.valueForUpdateTask = false;

			$scope.updateTaskShow = function(id){
				$scope.taskUpd =  Task.getTask({ id : id});
				$scope.taskUpd._id = id;	
             	$scope.valueForUpdateTask = $scope.valueForUpdateTask ? false : true;
			}	

			$scope.updateTask = function(id,projid){
				console.log(id + " id taska jbng")
				Task.taskUpdate($scope.taskUpd,projectDetails);
				$scope.valueForUpdateTask = false;
			}


		  	$scope.addUserToProject = function(projectId,userId) {
		  	$scope.user.$save({ projectid : projectId , id : userId},projectDetails);
		  	}

		  	$scope.deleteUserFromProject = function(userId,projectId) 			
		  	{

		    User.deleteUser({ id : userId , projectId : projectId},projectDetails);

		  	}


		}).controller('DropdownCtrl', function ($scope, $log) {
			  $scope.items = [
			    'The first choice!',
			    'And another choice for you.',
			    'but wait! A third!'
			  ];

			  $scope.status = {
			    isopen: false
			  };

			  $scope.toggled = function(open) {
			    $log.log('Dropdown is now: ', open);
			  };

			  $scope.toggleDropdown = function($event) {
			    $event.preventDefault();
			    $event.stopPropagation();
			    $scope.status.isopen = !$scope.status.isopen;
			  };

			  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});
}(angular));
