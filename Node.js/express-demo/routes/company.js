const express = require('express');
const router = express.Router();
const companyDao = require('../dao/companyDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addCompany', function (req, res, next) {
  companyDao.add(req, res, next);
});

router.delete('/delCompany', function (req, res, next) {
  companyDao.delete(req, res, next);
})

router.get('/queryAll', function (req, res, next) {
  companyDao.queryAll(req, res, next);
});

router.get('/queryByName', function (req, res, next) {
  companyDao.queryByName(req, res, next);
});

module.exports = router;
