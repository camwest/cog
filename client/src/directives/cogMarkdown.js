angular.module('cog').directive('markdown', ['$sanitize', function($sanitize) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (element.prop('tagName') !== 'COG') {
        return;
      }

      var fieldLabel = element.html();

      var str = 'scope.$watch(\'t("' + fieldLabel + '", "markdown")\', tUpdated)';
      eval(str);

      function tUpdated() {
        if (scope.t instanceof Function) {
          try {
            element.html( $sanitize( scope.t(fieldLabel, 'markdown') ) );
          } catch(msg) {
            console.log('cog parser: ' + msg);
          }
        }
      }

    }
  };
}]);
