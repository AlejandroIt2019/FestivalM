const { src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');


function css(done) {
    
    src('src/scss/**/*.scss') //identificar archivo
    .pipe( plumber())
    .pipe( sass())               //compilarlo
    .pipe(dest("build/css"));         //almacenarla en el disco duro
    
    done();
}
//se necesita conector de sass, plugins "gulp-sass"
//llamar siempre el node.

function dev(done) {
    
    watch('src/scss/**/*.scss', css);
    
    done();
}
exports.css = css;
exports.dev = dev;