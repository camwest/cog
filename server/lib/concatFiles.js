var fse = require('fs.extra')
  , fs = require('fs')
  , path = require('path')
  , async = require('async');

function concatFiles(options, callback) {
  var eachFile = options.eachFile || function(f) { return f; };

  async.map(options.paths, readFiles, combineFiles);

  function readFiles(dir, callback) {
    var walker = fse.walk(dir);
    var combinedData = '';

    walker.on('file', function(root, stat, next) {
      var filepath = path.join(root, stat.name);

      var pathParts = filepath.split('.');
      var extension = pathParts[pathParts.length - 1 ];

      if (options.extensions.indexOf(extension) !== -1) {
        fs.readFile(filepath, 'utf8', function(err, data) {
          if (err) {
            callback(err);
          }

          combinedData += eachFile(data, filepath);
          next();
        });
      } else {
        next();
      }
    });

    walker.on('end', function() {
      callback(null, combinedData);
    });
  }

  function combineFiles(err, results) {
    if (err) {
      callback(err);
    }

    callback(null, results.join(''));
  }
}

module.exports = concatFiles;
