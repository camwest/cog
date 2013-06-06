angular.module('cog').factory('Admin', ['$http', 'cogSettings', '$rootScope', function($http, cogSettings, $rootScope) {
  var scope = $rootScope.$new();
  var url = '/sites/' + cogSettings.site + '/auth';
  var user = angular.fromJson(localStorage.getItem('cog:user'));
  var templateUrl;

  if (user) {
    templateUrl = '/client/admin/logged_in.html';
  } else {
    templateUrl = '/client/admin/logged_out.html';
  }

  function valid(user) {
    saveToken(user);
    templateUrl = '/client/admin/logged_in.html';
  }

  function saveToken(u) {
    user = u;
    localStorage.setItem('cog:user', angular.toJson(user));
  }

  return {
    login: function(credentials) {
      return $http.post(url, { credentials: credentials }).success(valid);
    },

    getTemplate: function() {
      return templateUrl;
    },

    getUsername: function() {
      return user.username;
    },

    logout: function() {
      localStorage.removeItem('cog:token');
      templateUrl = '/client/admin/logged_out.html';
    }
  };
}]);
