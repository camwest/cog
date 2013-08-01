var cog = require('../services/cog')
  , site = require('../services/site')
  , async = require('async');

function newInstall(req, res) {
  res.render('new_install');
}

function create(req, res) {
  var user = req.body.install.user;

  async.waterfall([ connect, createSite(user) ], finish(res));
}

function connect(callback) {
  cog.connect(process.env.MONGO_URL, callback);
}

function createSite(user) {
  return function(callback) {
    site.create(user, callback);
  };
}

function finish(res) {
  return function(err, site) {
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
