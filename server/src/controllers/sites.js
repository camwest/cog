var Site = require('../services/site');

function build(req, res) {
  Site.create(function(err, site) {
    if (err) {
      throw err;
    }

    res.send(site._id);
  });
}

function show(req, res) {
  var siteId = req.params.id;

  var sections = Site.fetch(siteId, function(err, site) {
    if (err) {
      throw err;
    }

    res.send(site.sections);
  });
}

function put(req, res) {
  var siteId = req.params.id;
  var sections = req.body.sections;

  Site.update(siteId, { sections: sections }, function(err, site) {
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
