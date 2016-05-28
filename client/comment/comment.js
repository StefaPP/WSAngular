(function(angular) {
	angular.module('comment',['commentResource'])
		.controller('commentCtrl',function($scopeComment,Comment) {

      var load = function () {

      $scope.comment = new Comment();
      }

      load();
      $scope.addCom = function(id){
      console.log('ovde');
      console.log($scope.comment.text);
      }
		})
}(angular));
