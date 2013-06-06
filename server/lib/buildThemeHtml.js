var concatFiles = require('./concatFiles')
  , path = require('path');

function getFullPath(path) {
  return __dirname + '/../../' + path;
}

function buildThemeHtml(callback) {
  var options = {
    paths: [getFullPath('theme/includes'), getFullPath('theme/pages')],
    extensions: ['html'],
    eachFile: wrapScriptTag
  };

  function wrapScriptTag(file, filePath) {
    var rootPath = path.normalize(__dirname + '/../../theme');
    var relativePath = '/' + path.relative(rootPath, filePath);

    return '<script type="text/ng-template" id="' + relativePath + '">' + file + '</script>';
  }

  concatFiles(options, callback);
}

module.exports = buildThemeHtml;
