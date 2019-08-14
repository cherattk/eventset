const { src, dest } = require('gulp');

function build(){
  return src(['src/*' , 'README.md' , 'LICENSE'])
  .pipe(dest('build/'));
}

exports.build = build;