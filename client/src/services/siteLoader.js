angular.module('cog').factory('SiteLoader', ['cogSettings', '$http', '$q', 'Site', function(cogSettings, $http, $q, Site) {
  var url = "/sites/" + cogSettings.site;
  var server = new Site();
  var client = new Site();

  var waitingForLoad = [];

  function loadSite() {
    client.loading = true;

    $http.get(url).then(function(resp) {
      console.log('cog: site loaded');

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
      return $http.put(url, { sections: client.sections });
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
