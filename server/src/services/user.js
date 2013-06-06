var User = require('./models').User
  , bcrypt = require('bcrypt')
  , async = require('async');


function login(credentials, callback) {
  var sequence = [ findUser(credentials), verifyPassword(credentials), createNewToken, convertToJson ];

  async.waterfall(sequence, function(err, user) {
    if (err) {
      return callback(err);
    }

    callback(null, user);
  });
}

function findUser(credentials) {
  return function(callback) {
    User.findOne({ siteId: credentials.siteId, username: credentials.username }, callback);
  };
}

function verifyPassword(credentials) {
  return function(user, callback) {
    if (!user) {
      callback('Invalid credentials');
    }

    bcrypt.compare(credentials.password, user.password, function(err, res) {
      if (err) {
        return callback(err);
      }

      if (!res) {
        return callback('Invalid credentials');
      }

      callback(null, user);
    });
  };
}

function createNewToken(user, callback) {
  user.newToken(callback);
}

function convertToJson(user, callback) {
  callback(null, {
    username: user.username,
    token: user.token
  });
}

function isEditor(siteId, token, callback) {
  User.findOne({ siteId: siteId, token: token }, function(err, user) {
    if (err) {
      return callback(err);
    }

    if (!user) {
      return callback('Invalid credentials');
    }

    callback(null, user);
  });
}

module.exports = {
  login: login,
  isEditor: isEditor
};
