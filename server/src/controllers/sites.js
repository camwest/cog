var Site = require('../services/site');

function build(req, res) {
  res.render('new_site');
}

function create(req, res) {
  Site.create(req.body.user, function(err, site) {
    if (err) {
      res.send(err);
    }

    res.render('site', { siteId: site.id });
  });
}

function show(req, res) {
  var siteId = req.params.id;

  var sections = Site.fetch(siteId, function(err, site) {
    if (err) {
      res.send(err);
    }

    res.send(site.sections);
  });
}

function put(req, res) {
  var siteId = req.params.id;
  var sections = req.body.sections;

  Site.update(siteId, { sections: sections }, function(err, site) {
    if (err) {
      res.send(err);
    }

    res.send(site.sections);
  });
}

module.exports = {
  build: build,
  create: create,
  show: show,
  put: put
};
