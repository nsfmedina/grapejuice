console.log('Making some grapejuice! 🍇 🍇 🍇 🍷 🍷');

// Gulp Requirements
var gulp = require('gulp'),
juice = {
	bs : require('browser-sync'),
	concat : require('gulp-concat'),
	imagemin : require('gulp-imagemin'),
	merge : require('merge-stream'),
	postcss : {
		init : require('gulp-postcss'),
		autoprefixer : require('autoprefixer')
	},
	sass : require('gulp-sass'),
	order : require('run-sequence'),
};

// Soooooo...
// The tasks are actually pretty simple

// Styles
gulp.task('styles', function(){
	return gulp.src('src/scss/style.scss')
	.pipe(juice.sass({outputStyle: 'expanded'}).on('error', juice.sass.logError))
	.pipe(juice.postcss.init([
		juice.postcss.autoprefixer({
			browsers: ['last 5 versions']
		})
	]))
	.pipe(juice.concat('main.css'))
	.pipe(gulp.dest('dist/css/'))
});

// Images
gulp.task('images', function(){
	return gulp.src('src/images/**/*')
		.pipe(juice.imagemin())
		.pipe(gulp.dest('dist/images/'))
});

// Javascript
gulp.task('scripts', function(){
	return gulp.src('src/js/script.js')
		.pipe(juice.concat('main.js'))
		.pipe(gulp.dest('dist/js/'))
});

// HTML
gulp.task('html', function(){
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist/'))
});

gulp.task('vendor', function(){
	var js =  gulp.src(['src/vendor/js/jquery.min.js', 'src/vendor/js/**/*.js'])
			 	  .pipe(juice.concat('vendor.js'))
				  .pipe(gulp.dest('dist/js/'));
	var css = gulp.src('src/vendor/css/*.css')
				  .pipe(juice.concat('vendor.css'))
				  .pipe(gulp.dest('dist/css/'));

	return juice.merge(js, css);
});

gulp.task('browsersync', function(){
	juice.bs.init({
		server : {
			baseDir: 'dist/'
		}
	});

	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/js/script.js', ['scripts']);
	gulp.watch('src/images/**/*', ['images']);
	gulp.watch('src/vendor/**/*', ['vendor']);

	gulp.watch('dist/**/*').on('change', juice.bs.reload);
});

// Default
gulp.task('default', function(){
	juice.order(['html', 'styles', 'images', 'scripts', 'vendor'], 'browsersync', function(){
		console.log('Ready! There you go! 🍹');
	});
});