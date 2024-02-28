const { src, dest, watch, series, parallel } = require("gulp");
const gulp = require("gulp");
const $ = require("./modules.js");
const $config = require("./config.js");

// imgmin処理
const imageMinify = () => {
  return (
    gulp
      .src($config.src_path.img)
      .pipe(
        $.plumber({ errorHandler: $.notify.onError("<%= error.message %>") })
      )
      .pipe($.newer($config.dest_path.img)) // 新しく更新されたか確認
      .pipe(
        $.imagemin([
          $.imagemin.gifsicle({ optimizationLevel: 3 }),
          $.pngquant({ quality: [0.7, 0.85], speed: 1 }),
          $.imageminMozjpeg({
            quality: 100,
          }),
          $.imagemin.svgo({
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          }),
        ])
      )
      // 最適化後Webp
      .pipe(
        $.webp({
          quality: 100,
        })
      )
      .pipe(gulp.dest($config.dest_path.img))
  );
};

exports.imgCompress = imageMinify;
