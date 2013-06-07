angular.module('cog').controller('RuntimeRoutesCtrl', ['$scope', '$route', '$rootScope', function($scope, $route, $rootScope) {
  var pathName = window.location.pathname;

  if (pathName === '/') {
    pathName = '/index';
  }

  $rootScope.currentPageUrl = '/pages' + pathName + '.html';
}]);
