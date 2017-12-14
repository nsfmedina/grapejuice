var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var pixrem = require('pixrem');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');
var bs = require('browser-sync');
var order = require('run-sequence');

gulp.task('styles', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({
            'outputStyle': 'nested'
            }).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 5 versions']
            }),
            pixrem()
        ]))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('es5main', function(){
    return gulp.src('src/js/app.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('es5vendor', function(){
    return gulp.src('src/js/lib/**/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('scripts', function(){
    return gulp.src('src/js/bundle.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(browserify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('assets', function(){
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('html', function(){
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('bsync', function(){
    bs.init({
        server : {
            baseDir: './dist/'
        }
    });

    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/**/*.html', ['html']);

    gulp.watch('dist/**/*.css').on('change', function(){
        gulp.src('dist/**/*.css')
            .pipe(bs.stream());
    });
    gulp.watch('dist/**/*.js').on('change', bs.reload);
    gulp.watch('dist/**/*.html').on('change', bs.reload);
});

gulp.task('default', function(){
    order(['styles', 'es5main', 'es5vendor', 'assets', 'html'], 'bsync', function(){
        console.log('done!');
    });
});