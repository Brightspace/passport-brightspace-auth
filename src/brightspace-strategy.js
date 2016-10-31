'use strict';

var passport = require('passport-strategy'),
	TokenValidator = require('brightspace-auth-validation'),
	util = require('util');

function BrightspaceStrategy(options) {
	options = options || {};
	this.name = 'brightspace';
	this._validator = options.tokenValidator || new TokenValidator(options);
	passport.Strategy.call(this);
}

util.inherits(BrightspaceStrategy, passport.Strategy);

BrightspaceStrategy.prototype.authenticate = function(req) {
	var self = this;

	return this
		._validator
		.fromHeaders(req.headers)
		.then(function(token) {
			self.success(token);
		})
		.catch(function(err) {
			if (err.name && err.name === 'PublicKeyLookupFailedError') {
				self.error(err);
			} else {
				self.fail(err);
			}
		});
};

module.exports = BrightspaceStrategy;
