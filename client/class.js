(function(){
  'use strict';
  angular.module('class')
  .controller('ClassCtrl', ['$scope', '$http', function($scope, $http){
    $scope.student= {};
    $scope.students = [];

    $http.get('/public/data/student-info.json').success(function(results){
      $scope.students = results;
      console.log(results);
    });

  }]);
})();
