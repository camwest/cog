angular.module('cog').directive('pages', ['$compile', '$rootScope', function($compile, $rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (element.prop('tagName') !== 'COG') {
        return;
      }

      // need an ng view so we can use the routing
      var template = '<ng-view ng-hide="true"></ng-view><ng-include src="currentPageUrl"></ng-include>';
      element.append($compile(template)(scope));
    }
  };
}]);
