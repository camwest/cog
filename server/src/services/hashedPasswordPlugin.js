var bcrypt = require('bcrypt');

function hashedPasswordPlugin(schema, options) {
  options = options || {};
  var keyName = options.keyName || 'password';

  schema.pre('save', function(next) {
    var doc = this;

    if (this.isModified(keyName)) {
      var password = doc[keyName];

      var hash = bcrypt.hash(password, 8, function(err, hash) {
        if (err) {
          throw err;
        }
        doc[keyName] = hash;
        next();
      });
    }
  });
}

module.exports = hashedPasswordPlugin;
