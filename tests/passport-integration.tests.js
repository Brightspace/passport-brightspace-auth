'use strict';

var expect = require('chai').expect,
	passport = require('passport'),
	Promise = require('bluebird'),
	sinon = require('sinon'),
	strategy = new (require('../src/index'))();

var req = {
	headers: {
		token: 'I\'m a real token!'
	}
};

var res = {};

describe('Integration with Passport.js', function() {

	var validatorMock;

	before(function() {
		passport.use(strategy);
	});

	afterEach(function() {
		if (validatorMock) {
			validatorMock.restore();
		}
	});

	it('Success is communicated to Passport', function(done) {
		var token = {
			token: 'abc1234'
		};

		validatorMock = sinon.mock(strategy._validator);
		validatorMock
			.expects('fromHeaders')
			.once()
			.returns(Promise.resolve(token));

		passport.authenticate('brightspace', function(err, token, info) {
			expect(err).to.not.be.ok;
			expect(token).to.eql(token);
			expect(info).to.not.exist;
			done();
		})(req, res);
	});

	it('Failure is communicated to Passport', function(done) {
		validatorMock = sinon.mock(strategy._validator);
		validatorMock
			.expects('fromHeaders')
			.once()
			.returns(Promise.reject('Not authorized'));

		passport.authenticate('brightspace', function(err, token, info) {
			expect(err).to.not.be.ok;
			expect(token).to.not.be.ok;
			expect(info).to.equal('Not authorized');
			done();
		})(req, res);
	});

	it('Error is communicated if auth service is unavailable', function(done) {
		var error = {
			name: 'PublicKeyLookupFailedError',
			message: 'Couldn\'t reach auth service.'
		};

		validatorMock = sinon.mock(strategy._validator);
		validatorMock
			.expects('fromHeaders')
			.once()
			.returns(Promise.reject(error));

		passport.authenticate('brightspace', function(err, token, info) {
			expect(err).to.eql(error);
			expect(token).to.not.be.ok;
			expect(info).to.not.be.ok;
			done();
		})(req, res);
	});
});
