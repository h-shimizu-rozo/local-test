## gulp.js 構成説明

- settings(設定用ファイル)
  - config.js(ファイルの出力先、参照先を定義)
  - function.js(流用する関数を定義)
  - config.js(使用するパッケージを定義)
- tasks(実行するタスクを定義)
  - task.EJScompile.js(EJS を作成する)
  - task.imgCompress.js(画像の圧縮)
  - task.scss.js(scss コンパイル)
- index.js(タスク実行ファイル)
