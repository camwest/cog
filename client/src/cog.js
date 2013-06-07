var cog = angular.module('cog', []);

cog.config(['$provide', '$routeProvider', '$locationProvider', function($provide, $routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .otherwise({
      controller: 'RuntimeRoutesCtrl',
      template: '[dynamic]'
    });
}]);

cog.run(function() {
  console.log('cog: Booting angular');
});
