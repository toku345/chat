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
])
.controller('ChatCtrl', ['$scope', function($scope) {
  var ChatField = function(index, text) {
    this.index = index;
    this.text = text;
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
