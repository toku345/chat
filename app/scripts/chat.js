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
