var concatFiles = require('./concatFiles');

function getFullPath(path) {
  return __dirname + '/../../' + path;
}

function buildJs(callback) {
  var options = {
    paths: [getFullPath('client/vendor'), getFullPath('client/src')],
    extensions: ['js']
  };

  concatFiles(options, callback);
}

module.exports = buildJs;

