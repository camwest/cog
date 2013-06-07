var User = require('../services/user')
  , httpAuthToken = require('../../lib/httpAuthToken');

function create(req, res) {
  var credentials = req.body.credentials
    , site = req.site;

  credentials.siteId = site.id;

  User.login(credentials, function(err, clientUser) {
    if (err) {
      res.send(401, err);
    }

    res.send(clientUser);
  });
}

function editorRequired(req, res, next) {
  var token = httpAuthToken(req.headers.authorization)
    , site = req.site;

  if (!token) {
    return invalidToken(res);
  }

  User.isEditor(site.id, token, function(err, user) {
    if (err) {
      return res.send(403, err);
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
