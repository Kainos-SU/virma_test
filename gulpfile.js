const gulp = require("gulp");
const rename = require("gulp-rename");
const sourcemap = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
//const browserSync = require("browser-sync").create();
const fs = require("fs");
const path = require("path");

function clearDir(dir){
    fs.readdir(dir, (err, files) => {
        if (err) {
            throw err;
        }
        for (const file of files) {
            console.log(path.sep);
            fs.rmSync(dir + path.sep + file, {force:true, recursive:true});
        }
    });
}

function buildCSS(cb) {
    console.log("CSS");
    const css = "css";
    clearDir(css);
    gulp.src(`.${path.sep}src${path.sep}scss${path.sep}main.scss`)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename("style.css"))
        .pipe(autoprefixer({
            env: ">1% IE10",
            flexbox:true,
            grid:true,
        }))
        .pipe(gulp.dest("." + path.sep + css))
        .on("end", cb);
}

function buildHTML(cb) {
    const indexPath = "." + path.sep + "index.html"
    console.log(indexPath);
    if (!fs.existsSync(indexPath)) {
        console.log("There is no index.html");
        return cb();
    }
    gulp.src(indexPath)
    .pipe(htmlmin({
        collapseWhitespace:true,
        collapseBooleanAttributes:true,
        minifyCSS:true,
        minifyJS:true,
    }))
    .pipe(gulp.dest("."+ path.sep + "dist"))
    .on("end", cb);

}

function prebuildCSS (cb) {
    const css = `.${path.sep}css`;
    clearDir(css);
    gulp.src("./src/scss/main.scss")
        .pipe(rename("style.css"))
        .pipe(sourcemap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemap.write("maps"))
        .pipe(gulp.dest(css))
        .on("end", cb);
}

function buildJS(cb) {
    console.log("JS");
    const jsPath = `src${path.sep}js${path.sep}`;
    const jsDest = `.${path.sep}js`;
    fs.rmSync(jsDest + path.sep + "index.js", {force:true});
    if (!fs.existsSync(jsPath)) {
        console.log("There is no JS sources");
        return cb();
    }
    gulp.src([
            `${jsPath}index.js`,
        ])
        .pipe(concat("index.js"))
        .pipe(minify())
        .pipe(gulp.dest(jsDest))
        .on("end", cb);
}

function run (cb) {
    gulp.watch('./src/scss/**', prebuildCSS);
    gulp.watch('./src/js/**', buildJS);
};


exports.build = gulp.series(buildHTML, buildCSS, buildJS);

exports.css = buildCSS;
    
exports.start = run;
