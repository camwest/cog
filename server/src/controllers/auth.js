var User = require('../services/user')
  , httpAuthToken = require('../../lib/httpAuthToken');

function create(req, res) {
  var siteId = req.params.id;
  var credentials = req.body.credentials;

  // add the siteId to the credentials
  credentials.siteId = siteId;

  User.login(credentials, function(err, clientUser) {
    if (err) {
      res.send(401, err);
    }

    res.send(clientUser);
  });
}

function editorRequired(req, res, next) {
  var token = httpAuthToken(req.headers.authorization);
  var siteId = req.params.id;

  if (!token) {
    return invalidToken(res);
  }

  User.isEditor(siteId, token, function(err, user) {
    if (err) {
      res.send(403, err);
    }

    req.currentUser = user;
    next();
  });
}

function invalidToken(res) {
  res.send(400, 'Must supply a valid Authorization header');
}


module.exports = {
  create: create,
  editorRequired: editorRequired
};
