angular.module('cog').factory('FieldFormatters', function() {
  return {
    defaultType: 'text',
    _types: ['text', 'markdown'],

    isSupported: function(type) {
      return (this._types.indexOf(type) !== -1);
    },

    text: function(value) {
      return value;
    },

    markdown: function(value) {
      return markdown.toHTML(value);
    }
  };
});
