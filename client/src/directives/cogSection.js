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

        var unwatch = scope.$watch('cogSection', function(section) {

          if (!section) {
            return;
          }

          unwatch();
          console.log('cogSection was set', sectionName);

          var parent = scope.cogSection;
          scope.cogSection = null;

          parent.fetchSection(rawElement, sectionName).then(function(section) {
            scope.cogSection = section;
          });
        });
      });
    }
  };
}]);
