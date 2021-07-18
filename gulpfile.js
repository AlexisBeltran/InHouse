const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemap = require('gulp-sourcemaps');


const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    imagenes: 'src/img/**/*'
}

function css(){
    return gulp.src(paths.scss)
    .pipe(sourcemap.init())
    .pipe(sass()) //Realiza el compilado de sass
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('./build/css'));
}

function javascript(){
    return gulp.src(paths.js)
    .pipe(sourcemap.init())
    .pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(sourcemap.write('.'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/js'));
}

function imagenes(){
    return gulp.src(paths.imagenes)
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'))
    .pipe(notify({message: 'Imagen Completada'}));
}

function watchArchivos(){
    gulp.watch(paths.scss, css);
    gulp.watch(paths.js, javascript);
    gulp.watch(paths.imagenes, imagenes);
}

exports.default = gulp.parallel(css, javascript, imagenes, watchArchivos);



