var gulp = require('gulp');
var autoprefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cp = require('child_process');
var htmlmin = require('gulp-htmlmin');
var path = require('path');
var sass = require('gulp-sass');

var deploy = '_site/';

var paths = {
  scripts: 'assets/js/**',
  images: 'assets/img/**',
  styles: 'assets/css/**',
  markup: ['*.html', '_layouts/*.html', '_includes/*', '_posts/**']
};
gulp.task('build', function (done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('htmlmin', ['build'], function() {
  return gulp.src([
    path.join(deploy, '*.html'),
    path.join(deploy, '*/*.html'),
    path.join(deploy, '*/*/*.html'),
    path.join(deploy, '*/*/*/*.html')
  ])
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(deploy));
});

gulp.task('rebuild', ['htmlmin'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'htmlmin'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    },
    notify: false
  });
});

gulp.task('sass', function () {
  return gulp.src('assets/css/main.scss')
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(autoprefix(['last 10 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function () {
  gulp.watch([paths.styles, '!assets/css/main.css'], ['sass']);
  gulp.watch(paths.images, ['rebuild']);
  gulp.watch(paths.scripts, ['rebuild']);
  gulp.watch(paths.markup, ['rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
