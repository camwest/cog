var mongoose = require('mongoose')
  , path = require('path')
  , fs = require('fs')
  , site = require('./site')
  , async = require('async');

var connection;

function requireInstall() {
  return function(req, res, next) {
    var exceptedPaths = ['/install/new', '/install'];

    if (exceptedPaths.indexOf(req.url) !== -1) {
      return next();
    }

    async.waterfall([ loadConfig, verifyConnection, verifySite], installVerified(req, res, next));
  };
}

function loadConfig(callback) {
  if (process.env.MONGO_URL) {
    callback(null, process.env.MONGO_URL);
  } else {
    callback('MONGO_URL not specified in .env');
  }
}

function verifyConnection(mongoUrl, callback) {
  console.log('connecting to', mongoUrl);

  connect(mongoUrl, function(err) {
    if (err) {
      return callback(err);
    }

    console.log('connected successfully');
    callback();
  });
}

function verifySite(callback) {
  site.exists(callback);
}

function installVerified(req, res, next) {
  return function(err, currentSite) {
    if (err) {
      if (err === site.NO_SITE) {
        return res.redirect('/install/new');
      } else {
        return res.send(200, err);
      }
    }

    req.site = currentSite;
    next();
  };
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
  connect: connect,
};
