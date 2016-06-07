(function (angular) {

angular.module('commentResource',['ngResource'])
	.factory('Comment',function($resource){
		var Comment = $resource('/comments/:id',{id:'@id'},
			{deleteComment:{method:'DELETE',url:"/comments/:id/task/:taskId"},
		 	 commentPost : { method :'POST',url : '/comments/upd/:id',id : '@id'},
			 commentGet : { method :'GET',url : '/comments/upd/:id'}
			});
		
		return Comment;
	})

}(angular));
