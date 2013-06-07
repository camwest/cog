var Site = require('../services/site');

function show(req, res) {
  var site = req.site;

  res.send(site.sections);
}

function put(req, res) {
  var sections = req.body.sections
    , site = req.site;

  site.update({ sections: sections }, function(err, site) {
    if (err) {
      res.send(err);
    }

    res.send(site.sections);
  });
}

module.exports = {
  show: show,
  put: put
};
