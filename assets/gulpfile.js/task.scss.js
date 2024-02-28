const { src, dest, watch, series, parallel } = require("gulp");
const gulp = require("gulp");
const $ = require("./modules.js");
const fs = require("fs");
const $config = require("./config.js");

fs.readdir("./css", (err, files) => {
  files.forEach((file) => {
    if (file.indexOf(".css") !== -1) {
      // ~/css/直下のcssファイルのみ対象
      $config.cssFiles.push("../css/" + file);
    }
  });
});

//sass
const scss = () => {
  return src($config.scss)
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error:<%= error.message %>"),
      })
    )
    .pipe($.sourcemaps.init())
    .pipe($.sass({ outputStyle: "expanded" }))
    .pipe($.postcss([$.mqpacker()]))
    .pipe($.postcss([$.cssnext($config.browsers)]))
    .pipe(dest($config.dest_path.css.before_compression))
    .pipe($.cleanCSS())
    .pipe($.sourcemaps.write("/maps"))
    .pipe(
      $.rename({
        suffix: ".min",
      })
    )
    .pipe(dest($config.dest_path.css.min));
};

exports.scssCompress = scss;
