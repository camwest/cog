var cog = angular.module('cog', []);

cog.config(['$provide', function($provide) {
  $provide.constant('cogSettings', window.cog);
}]);

cog.run(function() {
  console.log('cog: Booting angular');
});
