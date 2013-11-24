var App = angular.module('app', [
  'ngRoute',
  'resources.subject',
  'chat'
])
.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('((');
  $interpolateProvider.endSymbol('))');
}])

.controller('MainCtrl', ['$scope', function($scope) {
}])

.controller('SubjectCtrl', ['$scope', 'subjectFactory', function($scope, subjectFactory) {
  $scope.subjectList = [];

  var Subject = function(text, id) {
    this.text = text;
    this.id = id;
  };

  subjectFactory.get(function(data) {
    var results = data.results,
        organizations = results.company;
    var subjectList = [
          "サーバー構築が出来ない", "若手が育たない", "社食が欲しい", "海外展開したい",
          "コスト削減したい", "営業力をあげたい", "人を育てたい", "離職率下げたい",
          "顧客満足度を上げたい", "経営リスクを下げたい"
        ],
        i = 0, len = 10;

    for (; i < len; i++) {
      $scope.subjectList.push(new Subject(
        subjectList[i], organizations[i].id
      ));
    }
  });
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
    $scope.inputText = undefined;
  };

  organizationFactory.get(function(data) {
    // TODO
    var results = data.results,
        organization = results.company[0];

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

angular.module('resources.subject', [
  'ngResource'
])
.factory('subjectFactory', ['$resource', function($resource) {
  var url = "http://webservice.recruit.co.jp/rikunabi-next/company/v1/pro?indus=0207&key=a363beff5c904bd7&format=jsonp",
      params = {callback:'JSON_CALLBACK'},
      organization = $resource(url, params, {get:{method:'JSONP'}});

  return organization;
}]);
