angular.module('cog').directive('admin', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (element.prop('tagName') !== 'COG') {
        return;
      }

      $rootScope.adminVisible = localStorage.getItem('cog:adminVisible') === 'true' ? true : false;

      element.on('click', function() {
        $rootScope.$apply(function() {
          $rootScope.adminVisible = true;
          localStorage.setItem('cog:adminVisible', 'true');
        });
      });

      $rootScope.hideAdmin = function() {
        localStorage.setItem('cog:adminVisible', 'false');
        $rootScope.adminVisible = false;
      };
    }
  };
}]);
