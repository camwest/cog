var less = require('less')
  , concatFiles = require('./concatFiles');

function getFullPath(path) {
  return __dirname + '/../../' + path;
}

function buildCss(callback) {
  var options = {
    paths: [getFullPath('client/admin/stylesheets'), getFullPath('theme/stylesheets')],
    extensions: ['css', 'less']
  };

  concatFiles(options, renderLess);

  function renderLess(err, rawCss) {
    if (err) {
      callback(err);
    }

    less.render(rawCss, function(err, css) {
      if (err) {
        callback(err);
      }

      callback(null, css);
    });
  }
}

module.exports = buildCss;
