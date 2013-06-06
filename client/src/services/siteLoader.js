angular.module('cog').factory('SiteLoader', ['cogSettings', '$http', '$q', 'Site', 'Admin', function(cogSettings, $http, $q, Site, Admin) {
  var url = "/sites/" + cogSettings.site;
  var server = new Site();
  var client = new Site();

  var waitingForLoad = [];

  function loadSite() {
    client.loading = true;

    $http.get(url).then(function(resp) {
      server.sections = resp.data;

      waitingForLoad.forEach(function(defer) {
        defer.resolve(client);
      });

      waitingForLoad = [];
      client.loading = false;
    });
  }

  function findOrCreateField(clientSection, fieldLabel) {
    return clientSection.findField(fieldLabel) || clientSection.copy(server, fieldLabel);
  }

  return {
    load: function() {
      var defer = $q.defer();

      if (server.isLoaded()) {
        defer.resolve(client);
      } else if (client.loading) {
        waitingForLoad.push(defer);
      } else {
        waitingForLoad.push(defer);
        loadSite();
      }

      return defer.promise;
    },

    save: function() {
      return $http.put(url, { sections: client.sections }, { headers: Admin.getHeaders() }).error(Admin.httpError('Error saving'));
    },

    tFunc: function(sectionLabel, callback) {
      var defer = $q.defer();

      this.load().then(function() {
        var section = client.findOrCreateSection(sectionLabel);

        defer.resolve(function(fieldLabel) {
          var field = findOrCreateField(section, fieldLabel);

          return field.value;
        });
      });

      return defer.promise;
    }
  };
}]);
