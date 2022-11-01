const { src, dest, watch, parallel} = require("gulp");

//css

const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//imagenes

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const cache = require("gulp-cache");
const avif = require('gulp-avif');

function css(done) {
    
    src('src/scss/**/*.scss') //identificar archivo
    .pipe( plumber())
    .pipe( sass())               //compilarlo
    .pipe(dest("build/css"));         //almacenarla en el disco duro
    
    done();
}

function imagenes(done) {
 
    const opciones = {
        optimizationLevel: 3
    };
 
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp(done){

    const opciones = {
        quality: 50
    };

    src('src/img//**/*.{png,jpg}')
        .pipe( webp(opciones))
        .pipe( dest('build/img'))
    done();
}

function formatoavif(done){

    const opciones = {
        quality: 50
    };

    src('src/img//**/*.{png,jpg}')
        .pipe( avif(opciones))
        .pipe( dest('build/img'))
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();
}

//se necesita conector de sass, plugins "gulp-sass"
//llamar siempre el node.

function dev(done) {

    watch('src/scss/**/*.scss', css);
    watch('src/scss/**/*.js', javascript);

    
    done();
}
exports.css = css;
exports.imagenes = imagenes;
exports.formatoavif = formatoavif;
exports.versionWebp = versionWebp;
exports.js = javascript;
exports.dev = parallel(imagenes, versionWebp, formatoavif, javascript, dev);
