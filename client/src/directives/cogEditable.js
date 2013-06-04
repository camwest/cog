angular.module('cog').directive('cogEditable', ['SiteLoader', function(SiteLoader) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      SiteLoader.tFunc(attrs.cogEditable).then(function(t) {
        scope.t = t;
      });
    }
  };
}]);
