angular.module('cog').controller('AdminCtrl', ['$scope', 'Admin', function($scope, Admin) {
  $scope.getTemplate = Admin.getTemplate;
  $scope.login = function(credentials) {
    $scope.validationMessage = '';
    $scope.validating = true;

    Admin.login(credentials).error(failed).always(stopValidating);

    function stopValidating() {
      $scope.validating = false;
    }

    function failed(message) {
      $scope.validationMessage = message;
    }
  };
}]);
