angular.module('cog').directive('cogSection', ['SiteLoader', function(SiteLoader) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      var rawElement = element[0];
      scope.cogSection = SiteLoader.fetchSection(rawElement, attrs.cogSection);
    }
  };
}]);
