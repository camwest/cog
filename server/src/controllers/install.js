var cog = require('../services/cog')
  , site = require('../services/site')
  , async = require('async');

function newInstall(req, res) {
  res.render('new_install');
}

function create(req, res) {
  var mongourl = req.body.install.mongourl;
  var user = req.body.install.user;

  async.waterfall([ connect(mongourl), createSite(user), saveInstall(mongourl) ], finish(res));
}

function connect(mongourl) {
  return function(callback) {
    cog.connect(mongourl, callback);
  };
}

function createSite(user) {
  return function(callback) {
    site.create(user, callback);
  };
}

function saveInstall(mongourl) {
  return function(site, callback) {
    var install = {
      mongourl: mongourl,
      siteId: site.id
    };

    cog.saveInstall(install, callback);
  };
}

function finish(res) {
  return function(err) {
    if (err) {
      res.send(500, err);
    }

    res.redirect('/');
  };
}

module.exports = {
  new: newInstall,
  create: create
};
