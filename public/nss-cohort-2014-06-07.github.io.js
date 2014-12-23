(function(){
  'use strict';
  angular.module('class', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
})();
;(function(){
  'use strict';
  angular.module('class')
  .controller('ClassCtrl', ['$scope', '$http', function($scope, $http){
    $scope.student= {};
    $scope.students = [];

    $http.get('/public/data/student-info.json').success(function(results){
      $scope.students = results;
    });

  }]);
})();
