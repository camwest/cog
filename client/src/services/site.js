angular.module('cog').factory('Site', ['SectionPresenter', function(SectionPresenter) {
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
}]);
