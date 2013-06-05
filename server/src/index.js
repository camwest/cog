var express = require('express')
  , mongoose = require('mongoose')
  , app = express()
  , cog = require('./controllers/cog')
  , sites = require('./controllers/sites');

mongoose.connect('mongodb://localhost/cog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo');
});

app.use(express.logger());
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use('/client/admin', express.static(__dirname + '/../../client/admin/templates'));
app.use(function(err, req, res, next) {
  console.log(error.stack);
  res.send(500, 'Oops!');
});

// COG: Sites
app.get('/sites/new', sites.build);
app.post('/sites', sites.create);
app.get('/sites/:id', sites.show);
app.put('/sites/:id', sites.put);

// COG: Client Resources
app.get('/cog.js', cog.js);
app.get('/cog.css', cog.css);
app.get('*', cog.index);

var port = process.env.PORT || 5000;

app.listen(port);
console.log('Listening on port ' + port);
