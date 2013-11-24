angular.module('chat', [
])
.directive('chatSpeakArea', [function(){
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: '/static/scripts/template/chat_speak_area.html',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {

    }
  };
}])
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
