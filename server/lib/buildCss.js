var fse = require('fs.extra')
  , fs = require('fs')
  , path = require('path')
  , less = require('less')
  , async = require('async');

function buildCss(callback) {
  var DIRS = ['client/admin/stylesheets', 'client/theme/stylesheets'];

  async.map(DIRS, readCss, function(err, results) {
    var rawCss = results.join('');

    less.render(rawCss, function(err, css) {
      if (err) {
        callback(err);
      }

      callback(null, css);
    });
  });
}

function readCss(dirSuffix, callback) {
  var dir = __dirname + '/../../' + dirSuffix;

  var walker = fse.walk(dir);
  var css = '';

  walker.on('file', function(root, stat, next) {
    var filepath = path.join(root, stat.name);

    var extension = filepath.split('.')[1];
    if (extension === 'css' || extension === 'less') {
      fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
          callback(err);
        }

        css += data;
        next();
      });
    } else {
      next();
    }
  });

  walker.on('end', function() {
    callback(null, css);
  });
}

module.exports = buildCss;
