var mongoose = require('mongoose')
  , path = require('path')
  , fs = require('fs')
  , site = require('./site')
  , async = require('async');

var CONFIG_PATH = path.normalize(__dirname + '../../../../.cog.json');
var connection;

function requireInstall() {
  return function(req, res, next) {
    var exceptedPaths = ['/install/new', '/install'];

    if (exceptedPaths.indexOf(req.url) !== -1) {
      return next();
    }

    async.waterfall([ loadConfig, parseJson, verifyConnection, fetchSite ], installVerified(req, next));
  };
}

function loadConfig(callback) {
  fs.readFile(CONFIG_PATH, callback);
}

function parseJson(file, callback) {
  var install = JSON.parse(file);
  callback(null, install);
}

function verifyConnection(install, callback) {
  connect(install.mongourl, function(err) {
    if (err) {
      return callback(err);
    }

    callback(null, install);
  });
}

function fetchSite(install, callback) {
  site.fetch(install.siteId, callback);
}

function installVerified(req, next) {
  return function(err, site) {
    if (err) {
      return res.redirect('/install/new');
    }

    req.site = site;
    next();
  };
}

function saveInstall(install, callback) {
  var json = JSON.stringify(install);
  fs.writeFile(CONFIG_PATH, json, callback);
}

function connect(dbConn, callback) {
  if (connection) {
    return callback();
  }

  mongoose.connect(dbConn);

  connection = mongoose.connection;

  connection.once('error', function(err) {
    callback(err);
  });

  connection.on('error', console.error.bind(console, 'connection error:'));

  connection.once('open', function() {
    callback();
  });
}

module.exports = {
  requireInstall: requireInstall,
  saveInstall: saveInstall,
  connect: connect,
};
