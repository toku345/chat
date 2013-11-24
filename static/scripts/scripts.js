var App = angular.module('app', [
  'ngRoute'
])
.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('((');
  $interpolateProvider.endSymbol('))');
}])
.controller('MainCtrl', ['$scope', function($scope) {
}]);
