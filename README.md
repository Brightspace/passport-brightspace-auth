# Brightspace Passport Authentication Strategy

[![Build Status](https://travis-ci.org/Brightspace/passport-brightspace-auth.svg?branch=master)](https://travis-ci.org/Brightspace/passport-brightspace-auth)

This is a Passport.js strategy for authenticating requests against the Brightspace authentication service.

## Usage

To add this library as a dependency to your project run
``` npm install --save passport-brightspace-auth ```

Configure it just as you would with any other Passport strategy and then you can use the Passport middleware to authenticate requests.

```
var BrightspaceStrategy = require('passport-brightspace-auth');
var app = require('express')();
var passport = require('passport');

passport.use(new BrightspaceStrategy());
app.use(passport.initialize());

app.get('/', passport.authenticate('brightspace'), function(req, res) {
	// req.user will be an instance of BrightspaceAuthToken
	// See https://github.com/Brightspace/node-auth-token
	res.send('You are authenticated!');
});

```

### Options
The strategy also supports a few configuration options:

```
var opts = {
	issuer: 'https://auth.brightspace.com/core',
	maxClockSkew: 300
};

passport.use(new BrightspaceStrategy(opts));
```
#### issuer
A String specifying the auth instance to connect to. If omitted, the default is https://auth.brightspace.com/core.

#### maxClockSkew
A Number specifying the allowed clock skew, in seconds, when validating time-based claims.  If omitted, the default is 300.
