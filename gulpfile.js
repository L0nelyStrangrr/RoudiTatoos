var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var rename = require('gulp-rename');
var imageMin = require('gulp-imagemin');
var newer = require('gulp-newer');
var gcmq = require('gulp-group-css-media-queries');
var terser = require('gulp-terser');
// var smartgrid = require('smart-grid');


// files paths
var paths = {
    src: {
        srcHtml: './src/pages/*.html',
        srcHtmlNav: './src/*.html',
        srcStyles: './src/styles/less/index.less',
        srcOtherStyles: './src/styles/less/*.less',
        srcSmartGrid: './src/styles/less/',
        srcCssPlugins: './src/styles/css/*.css',
        srcJs: './src/js/*.js',
        srcJsPlugins: './src/js/libs/*.js',
        srsImages: './src/img/**/*.{png,jpg,jpeg,svg,gif}'
    },
    build: {
        build: './build/*',
        buildStyles: './build/css',
        buildJs: './build/js',
        buildImages: './build/img',
        buildHtml: './build/pages',
        buildHtmlNav: './build/'
    }
}

function html() {
    return gulp.src(paths.src.srcHtml)
    .pipe(newer(paths.build.buildHtml))
    .pipe(gulp.dest(paths.build.buildHtml))
    .pipe(browserSync.stream());
}

function htmlNav() {
    return gulp.src(paths.src.srcHtmlNav)
    .pipe(newer(paths.build.buildHtmlNav))
    .pipe(gulp.dest(paths.build.buildHtmlNav))
    .pipe(browserSync.stream());
}

//Task for styles
function styles() {
    //template for css searching
    //All files for templates
    return gulp.src(paths.src.srcStyles)
    // .pipe(newer(paths.build.buildStyles))
    //converting less syntax into css
    .pipe((less()))
    //merging files into one
    // .pipe(concat('styles.css'))
    .pipe(gcmq())
    //add autoprefixes
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    //rename
    .pipe(rename({
        basename: "main",
    }))
    .pipe(gulp.dest(paths.build.buildStyles))
    //optimization
    .pipe(cleanCSS({
        level: {
            2: {
              all: false, // sets all values to `false`
              removeDuplicateRules: true // turns on removing duplicate rules
            }
          }
    }))
    .pipe(rename({
        basename: "main",
        suffix: ".min"
    }))
    //output folder for css styles
    .pipe(gulp.dest(paths.build.buildStyles))
    //plugins
    .pipe(gulp.src(paths.src.srcCssPlugins))
    .pipe(gulp.dest(paths.build.buildStyles))
    .pipe(browserSync.stream());
}

//Task for scripts
function scripts() {
    //template for js searching
    //All files for templates
    return gulp.src(paths.src.srcJs)
    // .pipe(newer(paths.build.buildJs))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.build.buildJs))
    .pipe(terser())
    .pipe(rename({
        suffix: '.min'
    }
    ))
    //output folder for js files
    .pipe(gulp.dest(paths.build.buildJs))
    //plugins
    .pipe(gulp.src(paths.src.srcJsPlugins))
    .pipe(gulp.dest(paths.build.buildJs))
    .pipe(browserSync.stream());
}

//Task for images 
function images() {
    return gulp.src(paths.src.srsImages)
    .pipe(newer(paths.build.buildImages))
    .pipe(imageMin())
    .pipe(gulp.dest(paths.build.buildImages))
    .pipe(browserSync.stream());
}

function clean() {
    return del([paths.build.build])
}

// function grid(done) {
//     let settings = {
//         filename: "_smart-grid",
//         outputStyle: "less",
//         columns: 12,
//         offset: "30px",
//         container: {
//             maxWidth: "1138px",
//             fields: "30px"
//         },
//         breakPoints: {
//             lg: {
//                 width: '1100px', /* -> @media (max-width: 1100px) */
//             },
//             md: {
//                 width: '960px'
//             },
//             sm: {
//                 width: '780px',
//                 fields: '15px' /* set fields only if you want to change container.fields */
//             },
//             xs: {
//                 width: '560px'
//             },
//             xxs: {
// 	            width: "420px"
// 	        }
//             }
//         }
//     smartgrid(paths.src.srcSmartGrid, settings)
//     done();
// }

//Watch files changes
function watch() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    //watch for css files changes
    gulp.watch([paths.src.srcStyles, paths.src.srcOtherStyles], styles)
    // gulp.watch(paths.src.srcOtherStyles, styles)
    //watch for js files changes
    gulp.watch(paths.src.srcJs, scripts)
    gulp.watch(paths.src.srcHtml, html)
    gulp.watch(paths.src.srcHtmlNav, htmlNav)
    gulp.watch(paths.src.srsImages, images)
    gulp.watch("./**/*.html").on('change', browserSync.reload)
}

gulp.task('html', html)
gulp.task('htmlNav', htmlNav)
//Task for calling styles function
gulp.task('styles', styles);
//Task for calling scripts function
gulp.task('scripts', scripts);
//Task fot images optimization 
gulp.task('images', images);
//Task for cleaning build folder
gulp.task('del', clean);
//Task for cnhange tracking
gulp.task('watch', watch);
//work tasks
gulp.task('build', gulp.series(clean, gulp.parallel(html, htmlNav, styles, scripts, images)));
gulp.task('dev', gulp.series('build', 'watch'));