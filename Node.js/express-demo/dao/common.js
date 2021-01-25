const fs = require('fs');
const multiparty = require('multiparty');
const mysql = require('mysql');
const conf = require('../conf/db');
const pool = mysql.createPool(conf.mysql);
const async = require('async');

// 向前台返回JSON方法的简单封装
const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

const upload = function (path, req, res, next) {
  return new Promise(function (resolve, reject) {
    // 解析一个文件上传
    const form = new multiparty.Form();
    // 设置编辑
    form.encoding = 'utf-8';
    // 设置文件存储路径
    form.uploadDir = path;
    // 设置单文件大小限制
    form.maxFilesSize = 2000 * 1024 * 1024;
    let textObj = {};
    let imgObj = {};
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
      }
      Object.keys(fields).forEach(function (name) { // 文本
        textObj[name] = fields[name];
      });
      Object.keys(files).forEach(function (name) {
        if (files[name] && files[name][0] && files[name][0].originalFilename) {
          imgObj[name] = files[name];
          let newPath = unescape(path + '/' + files[name][0].originalFilename);
          let num = 1;
          let suffix = newPath.split('.').pop();
          let lastIndex = newPath.lastIndexOf('.');
          let tmpname = newPath.substring(0, lastIndex);
          while (fs.existsSync(newPath)) {
            newPath = tmpname + '_' + num + '.' + suffix;
            num++;
          }
          fs.renameSync(files[name][0].path, newPath);
          imgObj[name][0].path = newPath;
        }
      });
      resolve([imgObj, textObj])
    });
  });
};

// 批量导入的事务处理
const execTrans = function (sql, sqlparamsEntities, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      return callback(err, null);
    }
    connection.beginTransaction(function (err) {
      if (err) {
        return callback(err, null);
      }
      let funcAry = [];
      sqlparamsEntities.forEach(function (sqlParam) {
        let temp = function (cb) {
          connection.query(sql, sqlParam, function (tErr, rows, fields) {
            if (tErr) {
              connection.rollback(function () {
                throw tErr;
              });
            } else {
              return cb(null, 'ok');
            }
          })
        };
        funcAry.push(temp);
      });

      async.series(funcAry, function (err, result) {
        if (err) {
          connection.rollback(function (err) {
            connection.release();
            return callback(err, null);
          });
        } else {
          connection.commit(function (err, info) {
            if (err) {
              connection.rollback(function (err) {
                connection.release();
                return callback(err, null);
              });
            } else {
              connection.release();
              return callback(null, info);
            }
          })
        }
      })
    });
  });
};

module.exports = {
  jsonWrite: jsonWrite,
  upload: upload,
  execTrans: execTrans
}
