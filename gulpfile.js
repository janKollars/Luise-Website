const gulp = require('gulp')
const babel = require('gulp-babel')
const autoprefix = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const cp = require('child_process')
const htmlmin = require('gulp-htmlmin')
const path = require('path')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')

const deploy = '_site/'

const paths = {
  scripts: 'assets/js/**',
  images: 'assets/img/**',
  styles: 'assets/css/**',
  markup: ['*.html', '_layouts/*.html', '_includes/*', '_posts/**', '_data/*']
}

gulp.task('build', function (done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done)
})

gulp.task('htmlmin', ['build'], function () {
  return gulp.src([
    path.join(deploy, '*.html'),
    path.join(deploy, '*/*.html'),
    path.join(deploy, '*/*/*.html'),
    path.join(deploy, '*/*/*/*.html'),
    path.join(deploy, '*/*/*/*/*.html'),
    path.join(deploy, '*/*/*/*/*/*.html')
  ])
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(deploy))
})

gulp.task('rebuild', ['htmlmin', 'js-uglify'], function () {
  browserSync.reload()
})

gulp.task('browser-sync', ['sass', 'htmlmin', 'js-uglify'], function () {
  browserSync({
    server: {
      baseDir: '_site'
    },
    notify: false
  })
})

gulp.task('sass', function () {
  return gulp.src('assets/css/main.scss')
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(autoprefix(['last 10 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('assets/css'))
})

gulp.task('js-uglify', ['build'], function (cb) {
  return gulp.src('_site/assets/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('_site/assets/js'))
})

gulp.task('watch', function () {
  gulp.watch([paths.styles, '!assets/css/main.css'], ['sass'])
  gulp.watch(paths.images, ['rebuild'])
  gulp.watch(paths.scripts, ['rebuild'])
  gulp.watch(paths.markup, ['rebuild'])
})

gulp.task('default', ['browser-sync', 'watch'])
