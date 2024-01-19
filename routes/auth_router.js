var express = require('express');
var router = express.Router();
const indexController = require('../controllers/auth_controller');
var authenticateJWT = require('../helpers/authenticateJWT');
const authorizeAdmin = require('../helpers/authorizeAdmin');

/* GET home page. */
router.post('/sign-up', indexController.post_sign_up);
router.post('/log-in', indexController.post_log_in);
router.get('/log-out', indexController.get_log_out);
router.get(
  '/session',
  authenticateJWT,
  authorizeAdmin,
  indexController.get_session
);

module.exports = router;
