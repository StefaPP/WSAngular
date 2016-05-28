(function (angular) {

angular.module('commentResource',['ngResource'])
	.factory('Comment',function($resource){
		var Comment = $resource('/comments/:id',{id:'@_id'});
		return Comment;
	})

}(angular));
