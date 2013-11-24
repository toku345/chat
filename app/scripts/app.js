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
