angular.module('cog').controller('AdminCtrl', ['$scope', 'Section', function($scope, Section) {
  Section.load(function(data) {
    $scope.sections = data;
  });
}]);
