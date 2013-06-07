var express = require('express')
  , app = express()
  , cog = require('./services/cog')
  , install = require('./controllers/install')
  , static = require('./controllers/static')
  , sites = require('./controllers/sites')
  , auth = require('./controllers/auth');

app.use(express.logger());
app.use(cog.requireInstall());
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use('/client/admin', express.static(__dirname + '/../../client/admin/templates'));
app.use('/includes', express.static(__dirname + '/../../theme/includes'));

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.send(500, 'Oops!');
});

// COG: Installation
app.get('/install/new', install.new);
app.post('/install', install.create);

// COG: Sites
app.get('/site', sites.show);
app.put('/site', auth.editorRequired, sites.put);

// COG: Authentication
app.post('/site/auth', auth.create);

// COG: Client Resources
app.get('/cog.js', static.js);
app.get('/cog.css', static.css);
app.get('/pages/*', function(req, res) {
  res.send(200, 'Sorry. The page cannot be displayed!');
});

app.get('*', static.index);

var port = process.env.PORT || 5000;

app.listen(port);
console.log('Listening on port ' + port);
