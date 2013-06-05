var expect = require('expect.js')
  , mongoose = require('mongoose')
  , Site = require('../../../../server/src/services/site');

mongoose.connect('mongodb://localhost/cog_test');

describe('Site', function() {
  afterEach(function(done) {
    Site.destroyAll(done);
  });

  describe('.create', function() {
    var site;

    beforeEach(function(done) {
      Site.create(function(err, model) {
        site = model;
        done();
      });
    });

    it('creates a new Site which is a mongo model', function() {
      expect(site.constructor.modelName).to.equal('Site');
    });

    it('has a sections array', function() {
      expect(site.sections).to.have.length(0);
    });
  });

  describe('.fetch', function() {
    var siteId;

    beforeEach(function(done) {
      Site.create(function(err, model) {
        siteId = model.id;
        done();
      });
    });

    it('finds a site based on the id', function(done) {
      Site.fetch(siteId, function(err, site) {
        expect(site.id).to.equal(siteId);
        done();
      });
    });
  });

  describe('.update', function() {
    var siteId;

    beforeEach(function(done) {
      Site.create(function(err, model) {
        siteId = model.id;
        done();
      });
    });

    it('creates sections with fields based on the passed in object', function(done) {
      var update = { sections: [ { label: 'Section', fields: [{ label: 'Field', value: 'Field Value' }] }] };

      Site.update(siteId, update, function(err, site) {
        expect(site.sections).to.have.length(1);

        var section = site.sections[0];

        expect(section.fields).to.have.length(1);

        var field = section.fields[0];

        expect(field.value).to.equal('Field Value');

        done();
      });
    });
  });

  describe('.destroyAll', function() {
    var siteId;

    beforeEach(function(done) {
      Site.create(function(err, model) {
        siteId = model.id;
        done();
      });
    });

    it('destroys all Sites', function() {
      Site.destroyAll(function(err) {
        Site.fetch(siteId, function(err, site) {
          expect(site).to.be(null);
        });
      });
    });
  });

  describe('#sections', function() {
    describe('a single section', function() {
      describe('#fields', function() {

        describe('a single field', function() {
        });
      });
    });
  });

});
