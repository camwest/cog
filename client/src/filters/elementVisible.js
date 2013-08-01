angular.module('cog').filter('elementVisible', function() {
  return function(collection) {
    if (!collection) {
      return;
    }

    var visibleItems = [];

    collection.forEach(function(item) {
      if (angular.element(item.element).is(':visible')) {
        visibleItems.push(item);
      }
    });

    return visibleItems;
  };
});
