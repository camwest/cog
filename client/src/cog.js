var cog = angular.module('cog', []);

cog.config(['$provide', function($provide) {
  $provide.constant('cogSettings', {
    stylesheetUrl: '/build.css'
  });
}]);

cog.run(function() {
  console.log('cog: Booting angular');
});
