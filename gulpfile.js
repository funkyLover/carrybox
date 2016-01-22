var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
// var sass = require('gulp-ruby-sass');
var del = require('del');

var fileUrl = '';

gulp.task('clean', function() {
  return del(['build/*']);
});

gulp.task('es6', function() {
  return gulp.src('src/**/*.js')
          .pipe($.changed('build'))
          .pipe($.babel({
            presets: ['es2015', 'react']
          }))
          .pipe(gulp.dest('build'))
          .pipe($.connect.reload());
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
          .pipe($.changed('build'))
          .pipe($.replace('@@FILEURL', fileUrl))
          .pipe(gulp.dest('build'))
          .pipe($.connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('src/**/*.scss')
    .pipe($.changed('build'))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.replace('@@FILEURL', fileUrl))
    .pipe(gulp.dest('build'))
    .pipe($.connect.reload());
});

gulp.task('connect', function() {
  $.connect.server({
    root: ['build'],
    port: 8080,
    livereload: true
  });
});

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe($.eslint({config: 'eslint.config.json'}))
    .pipe($.eslint.failOnError().on('error', function(err) {
      console.log(err);
    }))   
    .pipe($.eslint.format());
});

gulp.task('open', ['connect'], function() {
  gulp.src('./')
    .pipe($.open({ uri: 'localhost:8080', app: '/Applications/Google\ Chrome.app' }));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['es6', 'lint']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('default', ['clean'], function() {
  fileUrl = '';
  gulp.start('lint', 'es6', 'sass', 'html', 'watch', 'open');
});


gulp.task('build', ['clean'], function() {
  fileUrl = '';
  gulp.start('lint', 'es6', 'sass', 'html');
});


