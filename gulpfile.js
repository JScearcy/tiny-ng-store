var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', ['uglify'], function() {

});

gulp.task('uglify', [], function () {
    gulp.src(['./tiny-ng-store.js'])
    .pipe(concat('tiny-ng-store.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});