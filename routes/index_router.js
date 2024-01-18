var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index_controller');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/sign-up', indexController.get_sign_up);
router.post('/sign-up', indexController.post_sign_up);
router.post('/log-in', indexController.post_log_in);
router.get('/log-out', indexController.get_log_out);

module.exports = router;
