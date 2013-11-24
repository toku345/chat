var App = angular.module('app', [
  'ngRoute',
  'chat'
])
.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('((');
  $interpolateProvider.endSymbol('))');
}])
.controller('MainCtrl', ['$scope', function($scope) {
}]);

angular.module('chat', [
  'resources.chat'
])
.controller('ChatCtrl', ['$scope', 'organizationFactory', function($scope, organizationFactory) {
  var ChatField = function(index, text, playerType) {
    this.index = index;
    this.text = text;
    this.playerType = playerType || 0;
  };

  var chatIndex = 0;

  $scope.chatFields = [];

  $scope.inputTextSubmit = function() {
    var text = $scope.inputText;
    if (text === undefined) return;

    $scope.chatFields.push(new ChatField(chatIndex++, text));
    $scope.inputText = '';
  };

  organizationFactory.get(function(data) {
    // TODO
    var results = data.results,
        organization = results.company[0];
    console.log(organization);
    $scope.organization = organization;
  });
}]);

angular.module('resources.chat', [
  'ngResource'
])
.factory('chatFactory', ['$resource', 'webSocket', function($resource, webSocket) {
  // var test = $resource('/a/:userId', {userId: '@id'});
}])
.factory('organizationFactory', ['$resource', function($resource) {
  var url = "http://webservice.recruit.co.jp/rikunabi-next/company/v1/pro?indus=0207&key=a363beff5c904bd7&format=jsonp",
      params = {callback:'JSON_CALLBACK'},
      organization = $resource(url, params, {get:{method:'JSONP'}});
  return organization;
}])
.factory('webSocket', [function() {
}]);
