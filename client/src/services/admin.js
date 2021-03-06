angular.module('cog').factory('Admin', ['$http', '$rootScope', function($http, $rootScope) {
  var scope = $rootScope.$new();
  var url = '/site/auth';
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
      localStorage.removeItem('cog:user');
      templateUrl = '/client/admin/logged_out.html';
    },

    getHeaders: function() {
      return { 'Authorization': 'Token token="' + user.token + '"' };
    },

    httpError: function(message) {
      var self = this;

      return function(serverMessage) {
        console.error('cog: ' + serverMessage);

        if (message) {
          alert(message + '. Please login again');
        }

        self.logout();
      };
    }
  };
}]);
