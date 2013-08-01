angular.module('cog').factory('SiteSerializer', function() {
  function fieldsJson(fields) {
    var stripped = [];

    fields.forEach(function(field) {
      stripped.push( { label: field.label, type: field.type, value: field.value } );
    });

    return stripped;
  }

  return {
    toJson: function(site) {
      var sections = [];

      site.sections.forEach(function(section) {
        sections.push( { label: section.label, fields: fieldsJson(section.fields) } );
      });

      return sections;
    }
  };
});
