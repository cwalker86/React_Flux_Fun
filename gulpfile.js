// Gulp Build Process

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

// Broswerify Task
gulp.task('browserify', function() {
	// set source
	gulp.src('src/js/main.js')

		// Pass an object with key of transform
		// Tap into reactify to convert JSX to Javascript
		.pipe(browserify({transform: 'reactify'}))

    //contact main.js
		.pipe(concat('main.js'))

		// Destination folder
		.pipe(gulp.dest('dist/js'));

	});

// Copy Task
gulp.task('copy', function() {

	// Copy index.html to dist folder
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));

	// Copy everything to dist/assets folder
	gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest('dist/assets'));

});

// Default test that runs broswerify & copy
gulp.task('default',['browserify', 'copy']);

// Watch task
gulp.task('watch', function() {

	// Watch everything in src, if something changes, run default task
	gulp.watch('src/**/*.*', ['default']);
});