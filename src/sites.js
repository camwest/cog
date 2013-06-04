// creates a new mongo site and returns the id

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo');
});

var siteSchema = mongoose.Schema({
  sections: [sectionSchema]
});

var sectionSchema = mongoose.Schema({
  label: String,
  fields: [fieldSchema]
});

var fieldSchema = mongoose.Schema({
  label: String,
  value: String
});

var Site = mongoose.model('Site', siteSchema);

function build(req, res) {
  var site = new Site();

  site.save(function(err, site) {
    if (err) {
      throw err;
    }

    res.send(site._id);
  });
}

function show(req, res) {
  var siteId = req.params.id;
  var sections = Site.findById(siteId, function(err, site) {
    if (err) {
      throw err;
    }

    res.send(site.sections);
  });
}

function put(req, res) {
  var siteId = req.params.id;
  var sections = req.body.sections;

  Site.findOneAndUpdate({ _id: siteId }, { sections: sections }, function(err, site) {
    if (err) {
      throw err;
    }

    res.send(site.sections);
  });
}

module.exports = {
  build: build,
  show: show,
  put: put
};
