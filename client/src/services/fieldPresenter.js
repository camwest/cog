angular.module('cog').factory('FieldPresenter', ['FieldFormatters', function(formatters) {
  function FieldPresenter(field) {
    this.field = field;
    this.label = field.label;
    this.type = field.type;
    this.value = field.value;
  }

  FieldPresenter.prototype = {
    formatted: function() {
      return formatters[this.type](this.field.value);
    }
  };

  return FieldPresenter;
}]);

