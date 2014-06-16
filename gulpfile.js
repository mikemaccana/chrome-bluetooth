// Run 'gulp' to do the important stuff
var gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass')

var path = require('path');

gulp.task('sass', function () {
  gulp
    .src('./scss/*.scss')
    .pipe(sass())
    .pipe(prefixer('last 2 versions', 'ie 9'))
    .pipe(gulp.dest('./css'))
});

// The default task (called when you run `gulp`)
gulp.task('default', ['sass'], function() {
  gulp.watch('./scss/*.scss', ['sass']);
});

