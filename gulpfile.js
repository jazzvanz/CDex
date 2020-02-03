const { series, src, dest } = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')


function sassyWork(cb) {
  console.log('SASS work in process')
  return src('app/styles/*.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), cssnano() ])) 
    .pipe(rename({ extname: '.css' }))
    .pipe(dest('dist'))
}

function jsWork(cb) {
  console.log('JS work in process')
  return src('app/scripts/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist'))
}

exports.jsWork = jsWork;
exports.sassyWork = sassyWork;
exports.default = series(sassyWork, jsWork);
