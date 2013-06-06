angular.module('cog').controller('LoggedInAdminCtrl', ['$scope', 'SiteLoader', 'Admin', function($scope, SiteLoader, Admin) {
  $scope.site = SiteLoader.load();
  $scope.username = Admin.getUsername();
  $scope.logout = Admin.logout;

  $scope.save = function() {
    $scope.saving = true;

    SiteLoader.save().then(function() {
      $scope.saving = false;
      $scope.admin.$setPristine();
    });
  };
}]);
