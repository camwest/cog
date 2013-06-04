angular.module('cog').directive('cogCms', ['Template', function(Template) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      Template.link('/client/admin/index.html', scope).then(function(view) {
        element.find('body').append(view);
      });
    }
  };
}]);
