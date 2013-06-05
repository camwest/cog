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

var Model = mongoose.model('Site', siteSchema);

module.exports = {
  create: function(callback) {
    Model.create({}, callback);
  },

  fetch: function(siteId, callback) {
    Model.findById(siteId, callback);
  },

  update: function(siteId, update, callback) {
    Model.findOneAndUpdate({ _id: siteId }, update, callback);
  },

  destroyAll: function(callback) {
    Model.remove({}, callback);
  }
};
