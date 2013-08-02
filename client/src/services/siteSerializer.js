angular.module('cog').factory('SiteSerializer', function() {
  function fieldsJson(fields) {
    var stripped = [];

    fields.forEach(function(field) {
      stripped.push( { label: field.label, type: field.type, value: field.value } );
    });

    return stripped;
  }

  function toJson(site) {
    var sections = [];

    site.sections.forEach(function(section) {
      var obj = { label: section.label, fields: fieldsJson(section.fields) };

      if (section.sections) {
        obj.sections = toJson(section);
      }

      sections.push(obj);
    });

    return sections;
  }

  return {
    toJson: toJson
  };
});
