var fse = require('fs.extra')
  , fs = require('fs')
  , path = require('path')
  , async = require('async');

function buildJs(callback) {
  var DIRS = ['client/vendor', 'client/src'];

  async.map(DIRS, readJs, function(err, results) {
    if (err) {
      callback(err);
    }

    var rawJs = results.join('');

    callback(null, rawJs);
  });
}

function readJs(dirSuffix, callback) {

  var dir = __dirname + '/../../' + dirSuffix;


  var walker = fse.walk(dir);
  var js = '';

  walker.on('file', function(root, stat, next) {
    var filepath = path.join(root, stat.name);
    var pathParts = filepath.split('.');
    var extension = pathParts[pathParts.length - 1];

    if (extension === 'js') {
      fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
          callback(err);
        }

        js += data;
        next();
      });
    } else {
      next();
    }
  });

  walker.on('end', function() {
    callback(null, js);
  });
}


module.exports = buildJs;


