angular.module('cog').factory('Template', ['$http', '$compile', '$templateCache', '$q', function($http, $compile, $templateCache, $q) {
  // caches template based on a url
  function cache(url, callback) {
    $http.get(url).then(function(resp) {
      $templateCache.put(url, resp.data);
      callback(resp.data);
    });
  }

  return {
    /*
     * Returns a compileFunc for provided url
     * also caches the url in $templateCache
     */
    compile: function(url) {
      var defer = $q.defer();

      var template = $templateCache.get(url);

      if (template) {
        defer.resolve( $compile(template) );
      } else {
        cache(url, function(template) {
          defer.resolve( $compile(template) );
        });
      }

      return defer.promise;
    },

    /*
     * Compiles and links a template (via url) to a scope.
     * Stores template in template cache
     */
    link: function(url, scope) {
      var defer = $q.defer();

      this.compile(url).then(function(compileFn) {
        defer.resolve( compileFn(scope) );
      });

      return defer.promise;
    }
  };
}]);
