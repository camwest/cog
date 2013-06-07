angular.module('cog').filter('sectionVisible', function() {
  return function(sections) {
    if (!sections) {
      return;
    }

    var visibleSections = [];

    sections.forEach(function(section) {
      if (angular.element(section.element).is(':visible')) {
        visibleSections.push(section);
      }
    });

    return visibleSections;
  };
});
