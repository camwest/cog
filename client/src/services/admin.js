angular.module('cog').factory('Admin', ['$http', 'cogSettings', '$rootScope', function($http, cogSettings, $rootScope) {
  var scope = $rootScope.$new();
  var url = '/sites/' + cogSettings.site + '/auth';
  var userToken = localStorage.getItem('cog:token');
  var templateUrl;

  if (userToken) {
    templateUrl = '/client/admin/logged_in.html';
  } else {
    templateUrl = '/client/admin/logged_out.html';
  }

  function valid(token) {
    saveToken(token);
    templateUrl = '/client/admin/logged_in.html';
  }

  function saveToken(token) {
    userToken = token;
    localStorage.setItem('cog:token', token);
  }

  return {
    login: function(credentials) {
      return $http.post(url, { credentials: credentials }).success(valid);
    },

    getTemplate: function() {
      return templateUrl;
    },

    logout: function() {
      localStorage.removeItem('cog:token');
      templateUrl = '/client/admin/logged_out.html';
    }
  };
}]);
