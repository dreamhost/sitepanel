var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCSS    = require('gulp-clean-css');
var sass        = require('gulp-sass');
var stylelint   = require('gulp-stylelint');
var prefix      = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var lintconfig  = require('./stylelint.config.js');

/*

	## gulp serve

	1. Run the BrowserSync server at http://localhost:9999
	2. Compile .scss and inject into browser
	3. Live-reload .html

*/

gulp.task('serve', ['styles', 'js'], function() {

		browserSync.init({
				server: "./",
				port: 9999,
				open: false
		});

		gulp.watch("./assets/js/*.js", ['js']);
		gulp.watch("./assets/_scss/**/*.scss", ['styles']);
		gulp.watch("./**/*.html").on('change', browserSync.reload);
});

/*

	## gulp style linting

	1. Lint sass and log any errors to the console.

*/

gulp.task('lint', function() {
	return gulp.src([
		'./assets/_scss/*.scss'
	])
	.pipe(stylelint({
		failAfterError: false,
		reporters: [{formatter: 'string', console: true}]
	}));
});

/*

	## gulp styles

	1. Compile sass
	2. Inject into browser with BrowserSync

*/

gulp.task('styles', ['lint'], function () {
	return gulp.src('./assets/_scss/*.scss')
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(gulp.dest('./assets/css/'))
		.pipe(browserSync.stream());
});

/*

	## gulp

	The default gulp task will run the server which watches,
	compiles and updates HTML and SCSS.

*/

gulp.task('default', ['serve']);