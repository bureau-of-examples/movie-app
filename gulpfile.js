var gulp = require('gulp');
var del = require('del');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('default', [], function(){ //
    console.log('Running wiredep and inject for index.html...');
    return gulp.src('./src/index.html')
        .pipe(wiredep({}))
        .pipe($.inject(gulp.src(['./src/movie-app/app.js', './src/**/service.js', './src/**/*.controller.js'])))
        .pipe(gulp.dest('./src'));
});

