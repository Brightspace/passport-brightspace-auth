var eslint = require('gulp-eslint'),
	gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	util = require('gulp-util');

gulp.task('lint', function() {
	return gulp
		.src(['src/**/*.js', 'tests/**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], function() {
	return gulp
		.src('./tests/**/*.tests.js')
		.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('default', ['test'], function() {
	util.log('Ok!');
});
