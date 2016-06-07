(function (angular) {

angular.module('commentResource',['ngResource'])
	.factory('Comment',function($resource){
		var Comment = $resource('/comments/:id',{id:'@_id'},
			{delete:{method:'DELETE',url:"/comments/:id/task/:taskId"}});
		
		return Comment;
	})

}(angular));
