angular.module('cog').directive('admin', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (element.prop('tagName') !== 'COG') {
        return;
      }

      element.on('click', function() {
        $rootScope.$apply(function() {
          $rootScope.showAdmin();
        });
      });
    }
  };
}]);
