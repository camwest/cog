angular.module('cog').factory('FieldLinker', ['$sanitize', function($sanitize) {
  function FieldLinker(scope, element, fieldLabel, fieldType) {
    var str = 'scope.$watch(\'t("' + fieldLabel + '", "' + fieldType + '")\', tUpdated)';
    eval(str);

    function tUpdated() {
      if (scope.t instanceof Function) {
        try {
          element.html( $sanitize( scope.t(fieldLabel, fieldType) ) );
        } catch(msg) {
          console.log('cog parser: ' + msg);
        }
      }
    }
  }

  FieldLinker.prototype = {
    destroy: function() {
    }
  };

  return FieldLinker;
}]);
