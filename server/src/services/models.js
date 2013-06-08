var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var siteSchema = Schema({
  sections: [sectionSchema]
});

var sectionSchema = Schema({
  label: String,
  fields: [fieldSchema]
});

var fieldSchema = Schema({
  label: String,
  value: String,
  type: String
});

var userSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
  siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true }
});

userSchema.methods.newToken = function(callback) {
  var doc = this;

  require('crypto').randomBytes(48, function(ex, buf) {
    var token = buf.toString('hex');

    doc.update({ token: token }, function(err) {
      if (err) {
        return callback(err);
      }

      doc.token = token;

      callback(null, doc);
    });
  });
};

userSchema.plugin(require('./hashedPasswordPlugin'));

module.exports = {
  Site: mongoose.model('Site', siteSchema),
  User: mongoose.model('User', userSchema)
};

