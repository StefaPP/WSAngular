(function (angular){
	angular.module('chart',['ngRoute','userResource','projectResource','chart.js'])
	.controller('chartCtrl',function($scope,$rootScope,User,Project,Task,$http){
    var loadChart = function(){
      $scope.Project = Project.query();
      $scope.user = new User();
      $scope.newData = [];
      $scope.newLabel = []

    }
    loadChart()
    $scope.findUserFromProject = function(project){
      console.log(project);
      //Svi taskovi sa ovog projekta i useri na tim taskovima..
      //
        $scope.p = Project.getAll({ projectId : project});
          
          $scope.p.$promise.then(function(data){
          $scope.p  = data;
            for(var i = 0;i < $scope.p.tasks.length;i++){
              $scope.newLabel.push($scope.p.tasks[i].title)  
              $scope.newData.push($scope.p.tasks[i].createdAt)
            }
          console.log($scope.newLabel)
          $scope.labels = $scope.newLabel;
          $scope.data =[$scope.newData];
          $scope.newData = [];
          $scope.newLabel = [];
        })
    }
    

   $scope.labels = [$scope.newLabel];
   $scope.data =[$scope.newData];
   
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
})
}(angular))
