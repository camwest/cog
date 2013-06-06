angular.module('cog').directive('cogEditable', ['SiteLoader', function(SiteLoader) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      var rawElement = element[0];

      SiteLoader.tFunc(rawElement, attrs.cogEditable).then(function(t) {
        scope.t = t;
      });
    }
  };
}]);
