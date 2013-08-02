angular.module('cog').controller('LoggedInAdminCtrl', ['$scope', 'SiteLoader', 'Admin', 'FieldFormatters', function($scope, SiteLoader, Admin, FieldFormatters) {
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

  $scope.sectionPath = function() {
    return '/client/admin/section.html';
  };

  $scope.fieldEditorPath = function(type) {
    if (!FieldFormatters.isSupported(type)) {
      throw type + ' is not a supported field type';
    }

    return '/client/admin/editors/' + type + '.html';
  };
}]);
