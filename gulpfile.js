var gulp = require('gulp')
var replace = require('gulp-string-replace')
const serverUrls = {
  'develop': 'http://47.93.138.148:8192',
  'production': 'http://192.168.1.155:8192',
  'test': 'http://testnet.asch.io'
}

const runTask = (type) => {
  gulp.src('./src/utils/constants.js')
    .pipe(replace(new RegExp('serverHost.*'), "serverHost: '" + serverUrls[type] + "',")).pipe(gulp.dest('./src/utils'))
}

gulp.task('dev', () => {
  console.log('dev..')
  runTask('develop')
})
gulp.task('pro', () => {
  console.log('pro..')
  runTask('production')
})
gulp.task('test', () => {
  console.log('test..')
  runTask('test')
})

gulp.task('default', ['dev'])
