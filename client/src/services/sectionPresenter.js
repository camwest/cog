angular.module('cog').factory('SectionPresenter', ['FieldPresenter', function(FieldPresenter) {
  function SectionPresenter(section) {
    this.section = section;
    this.label = section.label;
    this.fields = section.fields;
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
    }
  };

  return SectionPresenter;
}]);

