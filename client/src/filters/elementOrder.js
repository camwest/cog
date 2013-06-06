angular.module('cog').filter('elementOrder', function() {
  return function(input) {
    if (!input) {
      return;
    }

    input.sort(function(a, b) {
      var elemA = a.element;
      var elemB = b.element;

      switch(elemB.compareDocumentPosition(elemA)) {
        case elemA.DOCUMENT_POSITION_PRECEDING || elemA.DOCUMENT_POSITION_CONTAINS:
          return -1;
        case elemA.DOCUMENT_POSITION_FOLLOWING || elemA.DOCUMENT_POSITION_CONTAINED_BY:
          return 1;
        default:
          return 0;
      }
    });

    return input;
  };
});
