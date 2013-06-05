var expect = require('expect.js')
  , fs = require('fs')
  , async = require('async')
  , concatFiles = require('../../../server/lib/concatFiles');

describe('concatFiles', function() {
  beforeEach(function(done) {
    async.parallel([
      function(callback) {
        fs.writeFile('/tmp/file1.txt', 'a', callback);
      },

      function(callback) {
        fs.writeFile('/tmp/file2.txt2', 'b', callback);
      }
    ], done);
  });

  it('combines files based on extensions', function(done) {
    concatFiles({
      paths: ['/tmp'],
      extensions: ['txt', 'txt2']
    }, function(err, results) {
      expect(results).to.equal('ab');
      done();
    });
  });
});
