angular.module('resources.subject', [
  'ngResource'
])
.factory('subjectFactory', ['$resource', function($resource) {
  var url = "http://webservice.recruit.co.jp/rikunabi-next/company/v1/pro?indus=0207&key=a363beff5c904bd7&format=jsonp",
      params = {callback:'JSON_CALLBACK'},
      organization = $resource(url, params, {get:{method:'JSONP'}});

  return organization;
}]);
