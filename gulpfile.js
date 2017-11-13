const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const pixrem = require('pixrem');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const browserify = require('gulp-browserify');
const babel = require('gulp-babel');
const bs = require('browser-sync');
const order = require('run-sequence');

const processlog = input => { console.log(`-=-=-=-=-=-=-=-=-=-=-=---> ${input}`) }

gulp.task('styles', () => {
    processlog('styles going!');
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 5 versions']
            }),
            pixrem()
        ])).pipe(concat('app.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('es5main', () => {
    processlog('es5? god have mercy on your soul');
    return gulp.src('src/js/app.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('es5vendor', () => {
    processlog('vendoring');
    return gulp.src('src/js/lib/**/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('scripts', () => {
    processlog('taskrunning scripts');
    return gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(browserify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('assets', () => {
    processlog('Moving assets!');
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('bsync', () => {
    processlog('Serving files!');
    bs.init({
        server : {
            baseDir: './'
        }
    });

    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/assets/**/*', ['assets']);

    gulp.watch('dist/**/*').on('change', bs.reload);
    gulp.watch('*.html').on('change', bs.reload);
});

gulp.task('next', order(['styles', 'scripts', 'assets'], 'bsync', function(){
    console.log('There you go :)');
}));

gulp.task('default', order(['styles', 'es5main', 'es5vendor', 'assets'], 'bsync', function(){
    console.log('There you went :)');
}));