(function(angular) {
  'use strict';

  angular.module('cog').directive('cog', ['SiteLoader', 'FieldLinker', function(SiteLoader, FieldLinker) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        var fieldLabel = element.html();
        var fieldType = attrs.cog;
        var linker = new FieldLinker(scope, element, fieldLabel, fieldType);
      }
    };
  }]);
}(angular));

