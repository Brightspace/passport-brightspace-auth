'use strict';

var expect = require('chai').expect,
	Strategy = require('../src/brightspace-strategy');

describe('Brightspace auth passport strategy', function() {
	it('This test passes', function(done) {
		expect(Strategy).to.be.ok;
		done();
	});

	it('Fails if authentication is rejected', function(done) {
		var strategy = new Strategy();
		strategy.authenticate({}, {});
		done();
	});
});
