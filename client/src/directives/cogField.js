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

  angular.module('cog').directive('field', ['FieldLinker', function(FieldLinker) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        if (element.prop('tagName') !== 'COG') {
          return;
        }

        var fieldLabel = element.html();
        var fieldType = attrs.field;
        var linker = new FieldLinker(scope, element, fieldLabel, fieldType);
      }
    };
  }]);
}(angular));

