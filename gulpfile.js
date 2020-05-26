const plugins = require('gulp-load-plugins')()
const { src, dest, series } = require('gulp')
const del = require('del')

/* 处理 JS 文件 */
const handleJs = function (cb) {
  src('./src/*.js')
    .pipe(plugins.babel())
    .pipe(plugins.uglify())
    .pipe(plugins.rename(function (path) {
      path.basename = 'watch-min'
      return path
    }))
    .pipe(dest('./dist/'))
  cb()
}

/* 清除目录 */
const clean = function (cb) {
  del('./dist/')
  cb()
}

exports.default = series(clean, handleJs)