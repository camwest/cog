angular.module('cog').controller('AdminCtrl', ['$scope', 'Site', function($scope, Site) {
  $scope.site = Site.load();

  $scope.save = function() {
    $scope.saving = true;

    Site.save().then(function() {
      $scope.saving = false;
    });
  };
}]);
