var cmsRoot = document.querySelector('[cog-cms]');

var cog = {
  site: $(cmsRoot).attr('cog-cms')
};

if (cmsRoot) {
  console.log('cog: Bootstrapping');

  $(function() {
    angular.bootstrap(document.documentElement, ['cog']);
  });
} else {
  throw 'cog-cms not found';
}

