var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', ['uglify','index-js-rename'], function() {

});

gulp.task('uglify', [], function () {
    return gulp.src(['./tiny-ng-store.js'])
        .pipe(concat('tiny-ng-store.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('umd', ['umd-rename'], function() {
    return gulp.src(['./tiny-ng-store.umd.js'])
        .pipe(concat('tiny-ng-store.umd.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('umd-rename', [], function() {
    return gulp.src(['./tiny-ng-store.js'])
        .pipe(concat('tiny-ng-store.umd.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('index-rename', ['index-js-rename', 'index-ts-rename'], function() {});

gulp.task('index-js-rename', [], function() {
    return gulp.src(['./tiny-ng-store.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('index-ts-rename', [], function() {
    return gulp.src(['./tiny-ng-store.ts'])
        .pipe(concat('index.ts'))
        .pipe(gulp.dest('./'));
});