angular.module('cog').directive('include', function() {
  return {
    restrict: 'A',
    template: '<div cog-section="{{ includeName }}"><ng-include src="includeUrl"></ng-include></div>',
    scope: true,
    link: function(scope, element, attrs) {
      if (element.prop('tagName') !== 'COG') {
        return;
      }

      scope.includeName = attrs.include;
      scope.includeUrl = '/includes/' + attrs.include + '.html';
    }
  };
});

