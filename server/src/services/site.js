var mongoose = require('mongoose');

var siteSchema = mongoose.Schema({
  sections: [sectionSchema]
});

var sectionSchema = mongoose.Schema({
  label: String,
  fields: [fieldSchema]
});

var fieldSchema = mongoose.Schema({
  label: String,
  value: String
});

var model = mongoose.model('Site', siteSchema);

module.exports = {
  create: function(callback) {
    model.create({}, callback);
  },

  fetch: function(siteId, callback) {
    model.findById(siteId, callback);
  },

  update: function(siteId, update, callback) {
    model.findOneAndUpdate({ _id: siteId }, update, callback);
  }
};
