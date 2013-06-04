angular.module('cog').directive('cogEditable', ['Editable', function(Editable) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      Editable.tFunc(attrs.cogEditable, function(t) {
        scope.t = t;
      });
    }
  };
}]);
