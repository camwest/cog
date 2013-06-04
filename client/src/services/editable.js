angular.module('cog').factory('Editable', function() {
  var sections = [
    {
      label: 'about',
      fields: [
        { label: 'string1', value: 'String 1' },
        { label: 'string2', value: 'String 2' }
      ]
    },

    {
      label: 'news',
      fields: [
        { label: 'Featured News: Header', value: 'Featured News' }
      ]
    }
  ];

  return {
    load: function(callback) {
      callback(sections);
    },

    tFunc: function(sectionLabel, callback) {
      // find the section
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

      // callback for now since this might be AJAX
      callback(function(fieldValue) {

        var field, i;

        for (i = 0; i < section.fields.length; i++) {
          if (section.fields[i].label === fieldValue) {
            field = section.fields[i];
            break;
          }
        }

        if (!field) {
          field = { label: fieldValue, value: '' };
          section.fields.push(field);
        }

        return field.value;
      });
    }
  };
});
