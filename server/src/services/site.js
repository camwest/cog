var Site = require('./models').Site
  , User = require('./models').User;

var NO_SITE = 'Site not created';

module.exports = {
  NO_SITE: NO_SITE,

  exists: function(callback) {
    Site.findOne({}, function(err, site) {
      if (err || !site) {
        return callback(NO_SITE);
      }

      callback(null, site);
    });
  },

  create: function(userParams, callback) {
    Site.create({}, function(err, site) {
      if (err) {
        callback(err);
      }

      // add site id to user
      userParams.siteId = site.id;

      User.create(userParams, function(err, user) {
        if (err) {
          callback(err);
        }

        callback(null, site);
      });
    });
  },

  //TODO: refactor
  fetch: function(siteId, callback) {
    Site.findById(siteId, callback);
  },

  update: function(siteId, update, callback) {
    Site.findOneAndUpdate({ _id: siteId }, update, callback);
  },

  destroyAll: function(callback) {
    Site.remove({}, callback);
  }
};
