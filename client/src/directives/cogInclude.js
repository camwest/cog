angular.module('cog').directive('include', function() {
  return {
    restrict: 'A',
    scope: {},
    template: '<ng-include src="includeUrl"></ng-include>',
    link: function(scope, element, attrs) {
      if (element.prop('tagName') !== 'COG') {
        return;
      }

      scope.includeUrl = '/includes/' + attrs.include + '.html';
    }
  };
});

