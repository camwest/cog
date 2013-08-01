angular.module('cog').directive('html', ['Template', function(Template) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      Template.link('/client/admin/index.html', scope).then(function(view) {
        element.find('body').append(view);
      });
    }
  };
}]);
