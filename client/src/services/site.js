angular.module('cog').factory('Site', function() {
  function SectionPresenter(section) {
    this.label = section.label;
    this.fields = section.fields;
  }

  SectionPresenter.prototype = {
    findField: function(label) {
      var match;

      this.fields.forEach(function(field) {
        if (field.label === label) {
          match = field;
        }
      });

      return match;
    },

    addField: function(field) {
      this.fields.push(field);
    },

    createField: function(fieldLabel) {
      var field = { label: fieldLabel, value: '' };

      this.addField(field);

      return field;
    },

    copy: function(site, fieldLabel) {
      var field = site.findField(this.label, fieldLabel);

      if (field) {
        this.addField(field);
      } else {
        field = this.createField(fieldLabel);
      }

      return field;
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

    findField: function(sectionLabel, fieldLabel) {
      var section = this.findSection(sectionLabel)
        , match;

      if (section) {
        match = section.findField(fieldLabel);
      }

      return match;
    },

    isLoaded: function() {
      return (this.sections.length > 0);
    },

    findOrCreateSection: function(sectionLabel) {
      return this.findSection(sectionLabel) || this.createSection(sectionLabel);
    }
  };

  return Site;
});
