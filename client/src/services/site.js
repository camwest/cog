angular.module('cog').factory('Site', ['cogSettings', '$http', '$q', function(cogSettings, $http, $q) {
  var url = "/sites/" + cogSettings.site;
  var site = {};
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

  function findOrCreateSection(sectionLabel) {
    var sections = site.sections;
    var section, i;

    for (i = 0; i < sections.length; i++) {
      if (sections[i].label === sectionLabel) {
        section = sections[i];
        break;
      }
    }

    if (!section) {
      section = { label: sectionLabel, fields: [] };
      sections.push(section);
    }

    return section;
  }

  function findOrCreateField(section, fieldLabel) {
    var field, i;

    for (i = 0; i < section.fields.length; i++) {
      if (section.fields[i].label === fieldLabel) {
        field = section.fields[i];
        break;
      }
    }

    if (!field) {
      field = { label: fieldLabel, value: '' };
      section.fields.push(field);
    }

    return field;
  }

  return {
    load: function() {
      var defer = $q.defer();

      if (site.sections) {
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
      return $http.put(url, { sections: site.sections });
    },

    tFunc: function(sectionLabel, callback) {
      var defer = $q.defer();

      this.load().then(function() {
        var section = findOrCreateSection(sectionLabel);

        defer.resolve(function(fieldLabel) {
          var field = findOrCreateField(section, fieldLabel);

          return field.value;
        });
      });

      return defer.promise;
    }
  };
}]);
