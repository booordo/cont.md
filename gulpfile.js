const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const wait = require('gulp-wait');
const browserSync = require('browser-sync');
const nodemon = require('nodemon');
const cssc = require('gulp-css-condense');
const imagemin = require('gulp-imagemin');

gulp.task('default', ['browser-sync', 'sass'], () => {
	gulp.watch('./styles/**/*.scss', ['sass']);
	gulp.watch('./views/**/*.pug').on('change', browserSync.reload);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
		files: ["public/**/*.*"],
		port: 4000
	});
});

gulp.task('nodemon', function(cb) {
	var started = false;
	return nodemon({
		script: './bin/www'
	}).on('start', () => {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('sass', () => {
	return gulp.src('./styles/style.scss')
		.pipe(wait(300))
		.pipe(gulpSass())
		.pipe(cssc())
		.pipe(gulp.dest('./public/stylesheets/'))
		.pipe(browserSync.stream());
});

gulp.task('image', () =>
	gulp.src('./public/images/new_cont/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./public/images/new_cont/min/'))
);