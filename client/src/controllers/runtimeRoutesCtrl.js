angular.module('cog').controller('RuntimeRoutesCtrl', ['$rootScope', '$window', function($rootScope, $window) {
  var pathName = $window.location.pathname;

  if (pathName === '/') {
    pathName = '/index';
  }

  $rootScope.currentPageName = pathName;
  $rootScope.currentPageUrl = '/pages' + pathName + '.html';
}]);
