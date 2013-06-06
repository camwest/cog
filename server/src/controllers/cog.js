var buildJs = require('../../lib/buildJs')
  , buildCss = require('../../lib/buildCss')
  , fs = require('fs');

function js(req, res) {
  buildJs(function(err, js) {
    if (err) {
      throw err;
    }

    res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
    res.send(js);
  });
}

function css(req, res) {
  buildCss(function(err, css) {
    if (err) {
      throw err;
    }

    res.setHeader('Content-Type', 'text/css; charset=UTF-8');
    res.send(css);
  });

}

function index(req, res) {
  fs.readFile(__dirname + '/../../../theme/theme.html', function(err, html) {
    if (err) {
      throw err;
    }

    res.type('.html');
    res.send(html);
  });
}

module.exports = {
  js: js,
  css: css,
  index: index
};
