var express = require('express')
  , app = express()
  , cog = require('./src/cog');

app.use(express.logger());
app.use('/client/admin', express.static(__dirname + '/client/admin/templates'));
app.use(function(err, req, res, next) {
  console.log(error.stack);
  res.send(500, 'Oops!');
});

// COG MAIN
app.get('/cog.js', cog.js);
app.get('/cog.css', cog.css);
app.get('*', cog.index);

var port = process.env.PORT || 5000;

app.listen(port);
console.log('Listening on port ' + port);
