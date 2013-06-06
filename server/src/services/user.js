var User = require('./models').User
  , bcrypt = require('bcrypt');


function clientUser(user) {
  return {
    username: user.username,
    token: user.token
  };
}

module.exports = {
  login: function(credentials, callback) {
    User.findOne({ siteId: credentials.siteId, username: credentials.username }, function(err, user) {
      if (err) {
        return callback(err);
      }

      if (!user) {
        return callback('Invalid credentials');
      }

      bcrypt.compare(credentials.password, user.password, function(err, res) {
        if (err) {
          callback(err);
        }

        if (!res) {
          callback('Invalid credentials');
        }

        user.newToken(function(err) {
          if (err) {
            callback(err);
          }

          callback(null, clientUser(user));
        });
      });
    });
  }
};
