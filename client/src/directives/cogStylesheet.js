angular.module('cog').directive('cogStylesheet', ['cogSettings', function(cogSettings) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.attr('rel', 'stylesheet');
      element.attr('type', 'text/css');
      element.attr('href', cogSettings.stylesheetUrl);
    }
  };
}]);
