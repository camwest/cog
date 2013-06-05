var concatFiles = require('./concatFiles');

function buildJs(callback) {
  var options = {
    paths: ['client/vendor', 'client/src'],
    extensions: ['js']
  };

  concatFiles(options, callback);
}

module.exports = buildJs;

