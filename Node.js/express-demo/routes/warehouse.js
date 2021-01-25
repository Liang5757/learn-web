const express = require('express');
const router = express.Router();
const warehouseDao = require('../dao/warehouseDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addCompany', function (req, res, next) {
  warehouseDao.add(req, res, next);
});

router.delete('/delCompany', function (req, res, next) {
  warehouseDao.delete(req, res, next);
})

router.get('/queryAll', function (req, res, next) {
  warehouseDao.queryAll(req, res, next);
});

router.get('/queryByName', function (req, res, next) {
  warehouseDao.queryByName(req, res, next);
});

module.exports = router;
