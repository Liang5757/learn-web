const express = require('express');
const router = express.Router();
const managerDao = require('../dao/managerDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addManager', function (req, res, next) {
  managerDao.add(req, res, next);
});

module.exports = router;
