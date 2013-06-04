var fse = require('fs.extra')
  , fs = require('fs')
  , path = require('path');

function build(callback) {
  var dir = __dirname + '/../client/src';

  var walker = fse.walk(dir);
  var js = '';

  walker.on('file', function(root, stat, next) {
    var filepath = path.join(root, stat.name);
    var extension = filepath.split('.')[1];

    if (extension === 'js') {
      fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) { throw err; }
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

module.exports = build;


