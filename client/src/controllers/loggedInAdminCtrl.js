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

  var supportedEditors = ['text', 'markdown'];
  $scope.fieldEditorPath = function(type) {
    if (supportedEditors.indexOf(type) === -1) {
      throw type + ' is not a supported field type';
    }

    return '/client/admin/editors/' + type + '.html';
  };
}]);
