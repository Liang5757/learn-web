const mysql = require('mysql');
const conf = require('../conf/db');
const sql = require('./companySqlMap');
const logger = require('../common/logger');
const common = require('./common');
// 使用连接池，提升性能
const pool = mysql.createPool(conf.mysql);

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      const param = req.body;
      // 建立连接，向表中插入值
      connection.query(sql.insert, [param.cname, param.address, param.aid], function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: `增加公司${param.cname}成功`
          };
        }
        // 以json形式，把操作结果返回给前台页面
        common.jsonWrite(res, result);
        // 释放连接
        connection.release();
      })
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      const param = req.body;
      // 建立连接，向表中插入值
      connection.query(sql.delete, [param.cid], function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: `删除公司${param.cname}成功`
          };
        }
        // 以json形式，把操作结果返回给前台页面
        common.jsonWrite(res, result);
        // 释放连接
        connection.release();
      })
    })
  },
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.queryAll, function (err, result) {
        let ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result
          };
        }
        common.jsonWrite(res, ret);
        connection.release();
      });
    });
  },
  queryByName: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      const param = req.body;
      // 建立连接，向表中插入值
      connection.query(sql.queryByName, [param.cname], function (err, result) {
        let ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result
          };
        }
        // 以json形式，把操作结果返回给前台页面
        common.jsonWrite(res, result);
        // 释放连接
        connection.release();
      })
    })
  },
}
