var cmsRoot = document.querySelector('[cog-cms]');

if (cmsRoot) {
  console.log('cog: Bootstrapping');
  angular.bootstrap(cmsRoot, ['cog']);
} else {
  throw 'cog-cms not found';
}

