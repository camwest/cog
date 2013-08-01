angular.module('cog').factory('SiteLoader', ['$http', '$q', 'Site', 'Admin', 'FieldFormatters', function($http, $q, Site, Admin, FieldFormatters) {
  var url = "/site";
  var server = new Site();

  var waitingForLoad = [];

  function loadSite() {
    server.loading = true;

    $http.get(url).then(function(resp) {
      server.sections = resp.data;

      waitingForLoad.forEach(function(defer) {
        defer.resolve(server);
      });

      waitingForLoad = [];
      server.loading = false;
    });
  }

  return {
    load: function() {
      var defer = $q.defer();

      if (server.isLoaded()) {
        defer.resolve(server);
      } else if (server.loading) {
        waitingForLoad.push(defer);
      } else {
        waitingForLoad.push(defer);
        loadSite();
      }

      return defer.promise;
    },

    save: function() {
      return $http.put(url, { sections: server.sectionJson() }, { headers: Admin.getHeaders() }).error(Admin.httpError('Error saving'));
    },

    fetchSection: function(sectionElement, sectionLabel) {
      var defer = $q.defer();

      this.load().then(function() {
        var section = server.findOrCreateSection(sectionLabel);
        section.setElement(sectionElement);

        defer.resolve(section);
      });

      return defer.promise;
    }
  };
}]);
