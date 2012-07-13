var requireindex = require('requireindex');
var expect = require('expect.js');

var request  = require('./lib/request');
var fixtures = requireindex('./test/fixtures');

describe('DEL singular', function () {
  before(fixtures.vegetable.init);
  beforeEach(fixtures.vegetable.create);
	   
  it('should delete the addressed document', function (done) {
    
    // make sure it's there
    var shitake = vegetables[3];
    var url     = '/api/vegetable/' + shitake._id;
    
    request('GET', url, function (err, r) {
      if (err) return done(err);
      
      var doc = JSON.parse(r.body);
      expect(doc).to.have.property('name', 'Shitake');
      
      request('DELETE', url, function (err, r) {
	if (err) return done(err);
	
	expect(r.response.statusCode).to.be(200);
	
	request('GET', url, function (err, r) {
	  if (err) return done(err);
	  
	  expect(r.response.statusCode).to.be(404);
	  done();
	});
      });
    });
    
  });
});