angular.module('cog').directive('cogEditable', ['Section', function(Section) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      Section.tFunc(attrs.cogEditable, function(t) {
        scope.t = t;
      });
    }
  };
}]);
