'use strict';

var expect = require('chai').expect,
	Promise = require('bluebird'),
	sinon = require('sinon'),
	Strategy = require('../src/index');

var req = {
	headers: {
		token: 'I\'m a real token!'
	}
};

describe('Brightspace auth passport strategy', function() {
	it('Fails if authentication is rejected', function(done) {
		var failSpy = sinon.spy();
		var strategy = new Strategy();

		var validatorMock = sinon.mock(strategy._validator);
		validatorMock
			.expects('fromHeaders')
			.once()
			.withArgs(req.headers)
			.returns(Promise.resolve(null));

		strategy.fail = failSpy;
		strategy
			.authenticate(req, {})
			.then(function() {
				expect(failSpy.callCount).to.equal(1);
				expect(failSpy.lastCall.args).to.eql(['Not authorized']);
				done();
			});
	});

	it('Succeeds if token is returned', function(done) {
		var successSpy = sinon.spy();
		var strategy = new Strategy();

		var token = {
			token: 'abc1234'
		};

		var validatorMock = sinon.mock(strategy._validator);
		validatorMock
			.expects('fromHeaders')
			.once()
			.withArgs(req.headers)
			.returns(Promise.resolve(token));

		strategy.success = successSpy;
		strategy
			.authenticate(req, {})
			.then(function() {
				expect(successSpy.callCount).to.equal(1);
				expect(successSpy.lastCall.args).to.eql([token]);
				done();
			});
	});

	// it('Returns an error if call to auth service fails', function(done) {
	// 	var errorSpy = sinon.spy();
	// 	var strategy = new Strategy();

	// 	var error = new Error('fail!');

	// 	var validatorMock = sinon.stub(strategy._validator, 'fromHeaders');
	// 	validatorMock.throws(error);

	// 	strategy.error = errorSpy;
	// 	strategy
	// 		.authenticate(req, {})
	// 		.then(function() {
	// 		 	done('Error was not caught and handled.');
	// 		})
	// 		.finally(function() {
	// 			expect(errorSpy.callCount).to.equal(1);
	// 			expect(errorSpy.lastCall.args).to.eql([error]);
	// 			done();
	// 		});
	// });

});
