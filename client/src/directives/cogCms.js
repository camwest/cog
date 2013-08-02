angular.module('cog').directive('html', ['Template', '$rootScope', 'SiteLoader', function(Template, $rootScope, SiteLoader) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.cogSection = SiteLoader;

      Template.link('/client/admin/index.html', scope).then(function(view) {
        element.find('body').append(view);
      });

      $rootScope.adminVisible = localStorage.getItem('cog:adminVisible') === 'true' ? true : false;

      $rootScope.showAdmin = function() {
        $rootScope.adminVisible = true;
        localStorage.setItem('cog:adminVisible', 'true');
        $('body').addClass('adminVisible');
      };

      $rootScope.hideAdmin = function() {
        localStorage.setItem('cog:adminVisible', 'false');
        $rootScope.adminVisible = false;
        $('body').removeClass('adminVisible');
      };

      key('c+o+g', function() {
        $rootScope.$apply(function() {
          $rootScope.showAdmin();
        });
      });
    }
  };
}]);
