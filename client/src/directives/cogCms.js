angular.module('cog').directive('html', ['Template', '$rootScope', function(Template, $rootScope) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      Template.link('/client/admin/index.html', scope).then(function(view) {
        element.find('body').append(view);
      });

      $rootScope.adminVisible = localStorage.getItem('cog:adminVisible') === 'true' ? true : false;

      $rootScope.showAdmin = function() {
        $rootScope.adminVisible = true;
        localStorage.setItem('cog:adminVisible', 'true');
      };

      $rootScope.hideAdmin = function() {
        localStorage.setItem('cog:adminVisible', 'false');
        $rootScope.adminVisible = false;
      };

      key('c+o+g', function() {
        $rootScope.$apply(function() {
          $rootScope.showAdmin();
        });
      });
    }
  };
}]);
