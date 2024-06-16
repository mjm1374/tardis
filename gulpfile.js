'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const tardis = require('./src/index');

const defaultTask = (done) => {
	// place code for your default task here
	console.log(tardis.doctorwho());
	build();
	watch();
	done();
};

const watchFiles = (done) => {
	gulp.watch('./src/*.js', scripts);
	done();
};

// Transpile, concatenate and minify scripts
const scripts = () => {
	return gulp
		.src('./src/*.js')
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(plumber())
		.pipe(concat('tardis.js'))
		.on('error', onError)
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('./dist'));
};

const onError = (err) => {
	console.log(err);
	this.emit('end');
};

const watch = gulp.parallel(watchFiles);
const js = gulp.series(scripts);
const build = gulp.series(gulp.parallel(js));

exports.watch = watch;
exports.build = build;
exports.js = js;
exports.default = defaultTask;
