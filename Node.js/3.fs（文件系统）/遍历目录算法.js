const fs = require('fs');
const path = require('path');

// 同步遍历
function travelSync(dir, callback) {
  fs.readdirSync(dir).forEach(function(file) {
    let pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

travelSync('../', (pathname) => {
  console.log(pathname);
})

// 异步遍历
function travel(dir, callback, finish) {
  fs.readdir(dir, function(err, files) {
    (function next(i) {
      if (i < files.length) {
        let pathname = path.join(dir, files[i]);

        fs.stat(pathname, function(err, stats) {
          if (stats.isDirectory()) {
            travel(pathname, callback, function() {
              next(i + 1);
            });
          } else {
            callback(pathname, function() {
              next(i + 1);
            });
          }
        });
      } else {
        finish && finish();
      }
    }(0));
  });
}
