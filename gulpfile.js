"use strict";

const gulp = require("gulp");
const babel = require('gulp-babel');
const plumber = require("gulp-plumber");
const tardis = require("tardis");

function defaultTask(done) {
    // place code for your default task here
    console.log(tardis.doctorwho());
    build();
    watch();
    done();
}

function watchFiles(done) {
    gulp.watch('src/*.js', scripts); 
    done();
}


// Transpile, concatenate and minify scripts
function scripts() {
    return (
        gulp
        .src('src/*.js')
        //.pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(plumber())
        //.pipe(concat('tarids.min.js'))
        //.on('error', onError)
        //.pipe(babel({  presets: ['@babel/env'] }))
        //.on('error', onError)
        //.pipe(uglify())
        //.on('error', onError)
        //.pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./dist'))
        //.pipe(browsersync.stream())
    );
}

function onError(err) {
    console.log(err);
    this.emit('end');
}

const watch = gulp.parallel(watchFiles);
const js = gulp.series(scripts);
const build = gulp.series(gulp.parallel(js));

exports.watch = watch;
exports.build = build;
exports.js = js;
exports.default = defaultTask;