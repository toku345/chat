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
.controller('ChatCtrl', ['$scope', 'chatFactory', function($scope, chatFactory) {
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
}]);

angular.module('resources.chat', [
  'ngResource'
])
.factory('chatFactory', ['$resource', 'webSocket', function($resource, webSocket) {
  // var test = $resource('/a/:userId', {userId: '@id'});
}])
.factory('webSocket', [function() {
}]);
