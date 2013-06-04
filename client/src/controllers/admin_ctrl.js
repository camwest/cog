angular.module('cog').controller('AdminCtrl', ['$scope', 'Editable', function($scope, Editable) {
  Editable.load(function(data) {
    $scope.sections = data;
  });
}]);
