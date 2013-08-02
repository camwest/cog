angular.module('cog').directive('cogSection', ['SiteLoader', function(SiteLoader) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {
      attrs.$observe('cogSection', function(sectionName) {
        if (!sectionName) {
          return;
        }

        var rawElement = element[0];
        scope.cogSection = SiteLoader.fetchSection(rawElement, sectionName);
      });
    }
  };
}]);
