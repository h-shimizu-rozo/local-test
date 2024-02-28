const { src, dest, watch, series, parallel } = require("gulp");
const gulp = require("gulp");
const config = require("./settings/config.js");
const $ = require("./settings/modules.js"); // プラグインを読み込む。接頭辞に$をつける。
const { createFolders } = require("./settings/functions.js"); // 汎用的なfunctionを記述
const { scssCompress } = require("./tasks/task.scss.js"); // scss 画像圧縮読み込み
const { EJScompile } = require("./tasks/task.EJScompile"); // wpHTML内で変数等を使えるようにする
const { imgCompress } = require("./tasks/task.imgCompress"); // imgcompress 画像圧縮読み込み

function firstAction(done) {
  createFolders(config.src_path.imgFolder, config.dest_path.css.min);
  scssCompress();
  done();
}

exports.run = series(firstAction, function secondAction(done) {
  gulp.watch(config.scss, scssCompress);
  gulp.watch(config.src_path.img, imgCompress);
  done();
});

exports.dev = series(firstAction, function secondAction(done) {
  $.browserSync.init({
    files: [
      "../**/*.php",
      "./**/*.js",
      "../**/*.html",
      "./**/*.scss",
      "./**/*.ejs",
    ],
    server: {
      baseDir: "../",
      directory: true,
    },
  });
  gulp.watch(config.scss, scssCompress);
  gulp.watch(["./**/*.ejs", "!./src/_*.ejs"], EJScompile);
  gulp.watch(config.src_path.img, imgCompress);
  done();
});
