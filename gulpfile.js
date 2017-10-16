const gulp = require('gulp');
const gulpSass = require('gulp-sass');

gulp.task('watch', () => {
  gulp.watch('./styles/**/*.scss', ['sass']);
})

gulp.task('sass', () => {
  return gulp.src('./styles/style.scss')
    .pipe(gulpSass())
    .pipe(gulp.dest('./public/stylesheets/'))
});

gulp.task('default', ['watch']);
