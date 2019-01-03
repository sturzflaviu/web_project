var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('styles', function () {
    return gulp.src('src/scss/**/*.scss')
      // Compile SASS files
      .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('dist/css'))
});

// Image compresor
gulp.task('imagemin', function () {
    gulp.src('img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// Clean my dist folder
gulp.task('clean', () => del(['dist']));

// Watch to 
gulp.task('watch', function(){    
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('img/**/*', ['imagemin']);
});


gulp.task('default', ['clean'], function () {
    runSequence(
      'styles',
      'imagemin'
    );
});