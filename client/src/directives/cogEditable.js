angular.module('cog').directive('cogEditable', ['Site', function(Site) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      Site.tFunc(attrs.cogEditable).then(function(t) {
        scope.t = t;
      });
    }
  };
}]);
