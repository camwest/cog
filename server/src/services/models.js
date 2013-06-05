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
  value: String
});

var userSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true }
});

userSchema.plugin(require('./hashedPasswordPlugin'));

module.exports = {
  Site: mongoose.model('Site', siteSchema),
  User: mongoose.model('User', userSchema)
};

