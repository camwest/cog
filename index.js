var express = require('express')
  , fs = require('fs')
  , app = express()
  , build = require('./lib/build');

app.use(express.logger());
app.use('/client/public', express.static(__dirname + '/client/public'));
app.use('/client/admin', express.static(__dirname + '/client/admin'));
app.use(function(err, req, res, next) {
  console.log(error.stack);
  res.send(500, 'Oops!');
});

app.get('/build.js', function(req, res) {
  build(function(err, js) {
    if (err) {
      throw err;
    }

    res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
    res.send( js );
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
