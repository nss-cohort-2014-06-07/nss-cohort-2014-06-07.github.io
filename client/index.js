(function(){
  'use strict';
  angular.module('class', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
})();
