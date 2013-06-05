var Site = require('./models').Site
  , User = require('./models').User;

module.exports = {
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
