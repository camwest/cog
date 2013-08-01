angular.module('cog').factory('SiteLoader', ['$http', '$q', 'Site', 'Admin', 'SiteSerializer', function($http, $q, Site, Admin, SiteSerializer) {
  var url = "/site";
  var site = new Site();

  var waitingForLoad = [];

  function loadSite() {
    site.loading = true;

    $http.get(url).then(function(resp) {
      site.sections = resp.data;

      waitingForLoad.forEach(function(defer) {
        defer.resolve(site);
      });

      waitingForLoad = [];
      site.loading = false;
    });
  }

  return {
    load: function() {
      var defer = $q.defer();

      if (site.isLoaded()) {
        defer.resolve(site);
      } else if (site.loading) {
        waitingForLoad.push(defer);
      } else {
        waitingForLoad.push(defer);
        loadSite();
      }

      return defer.promise;
    },

    save: function() {
      return $http.put(url, { sections: SiteSerializer.toJson(site) }, { headers: Admin.getHeaders() }).error(Admin.httpError('Error saving'));
    },

    fetchSection: function(sectionElement, sectionLabel) {
      var defer = $q.defer();

      this.load().then(function() {
        var section = site.findOrCreateSection(sectionLabel);
        section.setElement(sectionElement);

        defer.resolve(section);
      });

      return defer.promise;
    }
  };
}]);
