angular.module('cog').directive('field', ['$sanitize', function($sanitize) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (element.prop('tagName') !== 'COG') {
        return;
      }

      var fieldLabel = element.html();
      var fieldType = attrs.field;

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
  };
}]);
