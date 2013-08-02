angular.module('cog').factory('SectionPresenter', ['FieldPresenter', '$q', function(FieldPresenter, $q) {
  function SectionPresenter(Site, section) {
    this.section = section;
    this.label = section.label;
    this.fields = section.fields;

    if (!section.sections) {
      section.sections = [];
    }

    // add sections
    this.site = new Site();
    this.site.sections = section.sections;

    this.section.items = function() {
      this.fields.forEach(function(field) {
        field._type = 'field';
      });

      this.sections.forEach(function(section) {
        section._type = 'section';
      });

      var items = this.fields.concat(this.sections);

      return items;
    };
  }

  SectionPresenter.prototype = {
    findOrCreateField: function(element, label, type) {
      if (!type) {
        throw 'must supply a type';
      }

      var field = this.findField(label, type) || this.createField(label, type);

      field.element = element;

      return new FieldPresenter(field);
    },

    findField: function(label, type) {
      var match;

      this.fields.forEach(function(field) {
        if (field.label === label) {
          match = field;
          match.type = type;
        }
      });

      return match;
    },

    createField: function(fieldLabel, type) {
      var field = { label: fieldLabel, value: '', type: type };

      this._addField(field);

      return field;
    },

    _addField: function(field) {
      this.fields.push(field);
    },

    setElement: function(element) {
      this.section.element = element;
    },

    fetchSection: function(sectionElement, sectionLabel) {
      // all fetchSection needs to be async
      var defer = $q.defer();

      var section = this.site.findOrCreateSection(sectionLabel);
      section.setElement(sectionElement);

      defer.resolve(section);

      return defer.promise;
    }
  };

  return SectionPresenter;
}]);

