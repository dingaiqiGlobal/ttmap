var jsdoc = require('gulp-jsdoc3');
var gulp = require('gulp');
var clean = require('gulp-rimraf');
var connect = require('gulp-connect');
var open = require('open');
var webpack = require('webpack-stream');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var convertEncoding = require('fd-gulp-convert-encoding');
var webpackConfig = require('./webpack.config.js')

gulp.task('lib-css', function() {
    return gulp.src(['./css/*.css'])
        .pipe(convertEncoding('utf-8'))
        .pipe(concat('TTMap.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./lib/'))
        .pipe(gulp.dest('./dist/lib/'))
        .pipe(connect.reload());
});

gulp.task('webpack',function (cb) {
    return webpack(webpackConfig)
        .pipe(gulp.dest('./dist/lib/'))
        .pipe(connect.reload());
});

gulp.task('doc', function (cb) {
    var config = require('./jsdoc.json');
    gulp.src(['README.md', './src/**/*.js'], {read: false}).pipe(jsdoc(config,cb));
});

gulp.task('copy-doc', function() {
    return gulp.src(['./doc/**/*'])
        .pipe(gulp.dest('./dist/doc'))
        .pipe(connect.reload());
});

gulp.task('copy-demo', function() {
    return gulp.src(['./demo/**/*'])
        .pipe(gulp.dest('./dist/demo'))
        .pipe(connect.reload());
});

/**
 * 复制第三方插件到目标文件
 */
gulp.task('copy-thirds', function() {
    return gulp.src(['./thirds_plugins/**/*'])
        .pipe(gulp.dest('./dist/thirds_plugins'))
        .pipe(connect.reload());
});

gulp.task('copy-html', function() {
    return gulp.src(['./html/**/*'])
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('copy-images', function() {
    return gulp.src(['./images/**/*'])
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('watch',(done) => {
    gulp.watch('./src/**/*',gulp.series('webpack','doc','copy-doc'));
    gulp.watch('./demo/**/*',gulp.series('copy-demo'));
    gulp.watch('./html/**/*',gulp.series('copy-html'));
    gulp.watch('./images/**/*',gulp.series('copy-images'));
    gulp.watch('./css/**/*',gulp.series('lib-css'));
    gulp.watch('./thirds_plugins/**/*',gulp.series('copy-thirds'));
    done();
})

gulp.task('build', gulp.series('webpack','lib-css','doc','copy-doc','copy-demo','copy-html','copy-images','copy-thirds'), (done) => {
    done();
});

// 创建实时更新服务
gulp.task('server', (done) => {
    connect.server({
        root:"./dist",// 路径
        port:'8080',//端口号
        debug:true,
        livereload: true //false的话就是关闭实时更新
    });
    open("http://127.0.0.1:8080")
    done();
});

//启动实时更新 gulp dev
gulp.task("dev",gulp.series('watch','server'),(done) =>{
    done();
});