angular.module('cog').factory('FieldLinker', ['$sanitize', function($sanitize) {
  function FieldLinker(scope, element, fieldLabel, fieldType) {
    var rawElement = element[0];

    scope.$watch('cogSection', function() {
      if (!scope.cogSection) {
        return;
      }

      scope.cogSection.then(function(section) {
        scope.cogField = section.findOrCreateField(rawElement, fieldLabel, fieldType);
      });
    });

    scope.$watch('cogField.formatted()', function() {
      if (!scope.cogField) {
        return;
      }

      element.html( $sanitize( scope.cogField.formatted() ) );
    });
  }

  FieldLinker.prototype = {
    destroy: function() {
    }
  };

  return FieldLinker;
}]);
