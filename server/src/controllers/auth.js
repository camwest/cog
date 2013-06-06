var User = require('../services/user');

function create(req, res) {
  var siteId = req.params.id;
  var credentials = req.body.credentials;

  // add the siteId to the credentials
  credentials.siteId = siteId;

  User.login(credentials, function(err, token) {
    if (err) {
      res.send(401, err);
    }

    res.send(token);
  });
}

module.exports = {
  create: create
};
