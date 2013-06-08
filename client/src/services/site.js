angular.module('cog').factory('Site', function() {
  function SectionPresenter(section) {
    this.section = section;
    this.label = section.label;
    this.fields = section.fields;
  }

  SectionPresenter.prototype = {
    findOrCreateField: function(label, type) {
      if (!type) {
        throw 'must supply a type';
      }

      return this.findField(label, type) || this.createField(label, type);
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
    }
  };

  function Site() {
    this.sections = [];
  }

  Site.prototype = {
    // finds section and returns it, or returns undefined
    findSection: function(label) {
      var match;

      this.sections.forEach(function(section) {
        if (section.label === label) {
          match = section;
        }
      });

      if (match) {
        match = new SectionPresenter(match);
      }

      return match;
    },

    // creates a section and returns it
    createSection: function(label) {
      var section = { label: label, fields: [] };

      this._addSection(section);

      return this.findSection(label);
    },

    _addSection: function(section) {
      this.sections.push(section);
    },

    isLoaded: function() {
      return (this.sections.length > 0);
    },

    findOrCreateSection: function(sectionLabel) {
      return this.findSection(sectionLabel) || this.createSection(sectionLabel);
    },

    sectionJson: function() {
      var sections = [];

      this.sections.forEach(function(section) {
        sections.push( { label: section.label, fields: section.fields } );
      });

      return sections;
    }
  };

  return Site;
});
