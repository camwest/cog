angular.module('cog').controller('AdminCtrl', ['$scope', 'SiteLoader', function($scope, SiteLoader) {
  $scope.site = SiteLoader.load();

  $scope.save = function() {
    $scope.saving = true;

    SiteLoader.save().then(function() {
      $scope.saving = false;
      $scope.admin.$setPristine();
    });
  };
}]);
