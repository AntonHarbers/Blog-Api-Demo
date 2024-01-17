var express = require('express');
var router = express.Router();
const userController = require('../controllers/user_controller');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('users');
});

module.exports = router;
