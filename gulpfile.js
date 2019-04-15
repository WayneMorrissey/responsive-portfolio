const { src, dest, watch, task, parallel } = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');



//build directory

const buildDirecotry = [
  'src/index.html',
  'src/js/**/*.*'
];
const imgDirectory = 'src/img/**/*.*';
const scssDirectory = 'src/scss/*.scss';
const scssWatchDir = 'src/scss/**/*.scss';


//The site build task
const transfer = () => {
    return src(buildDirecotry, { base: './src' })
    .pipe(dest('dist'));
};

const css = () => {
    return src(scssDirectory)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(dest('dist/css'));
};

const img = () => {
    return src(imgDirectory)
    .pipe(imagemin())
    .pipe(dest('dist/img'));
};



const watchTask = () => {
    watch(buildDirecotry, transfer);
    watch(scssWatchDir, css);
    watch(imgDirectory, img);
};


// exports.netlifybuild = task('netlifybuild');
exports.build = parallel(transfer, css, img);
exports.watch = watchTask;



// task('netlifybuild', () => {
//     return src(buildDirecotry, { base: './src' })
//       .pipe(dest('build'));
// });