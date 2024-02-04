var express = require('express');
var router = express.Router();
const indexController = require('../controllers/auth_controller');
var authenticateJWT = require('../middleware/authenticateJWT');
const authorizeAdmin = require('../middleware/authorizeAdmin');

/* GET home page. */
router.post('/sign-up', indexController.post_sign_up);
router.post('/log-in', indexController.post_log_in);
router.get(
  '/session',
  authenticateJWT,
  authorizeAdmin,
  indexController.get_session
);

module.exports = router;
