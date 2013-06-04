var express = require('express')
  , fs = require('fs')
  , app = express()
  , buildJs = require('./lib/buildJs')
  , buildCss = require('./lib/buildCss');

app.use(express.logger());
app.use('/client/public', express.static(__dirname + '/client/public'));
app.use('/client/admin', express.static(__dirname + '/client/admin/templates'));
app.use(function(err, req, res, next) {
  console.log(error.stack);
  res.send(500, 'Oops!');
});

app.get('/build.js', function(req, res) {
  buildJs(function(err, js) {
    if (err) {
      throw err;
    }

    res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
    res.send(js);
  });
});

app.get('/build.css', function(req, res) {
  buildCss(function(err, css) {
    if (err) {
      throw err;
    }

    res.setHeader('Content-TYpe', 'text/css; charset=UTF-8');
    res.send(css);
  });
});

app.get('*', function(req, res) {
  fs.readFile(__dirname + '/client/theme/theme.html', function(err, html) {
    if (err) {
      throw err;
    }

    res.type('.html');
    res.send(html);
  });
});

var port = process.env.PORT || 5000;

app.listen(port);
console.log('Listening on port ' + port);
