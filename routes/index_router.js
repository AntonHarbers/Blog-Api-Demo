var express = require('express');
var router = express.Router();
var authenticateJWT = require('../helpers/authenticateJWT');

const indexController = require('../controllers/index_controller');

/* GET home page. */
router.post('/sign-up', indexController.post_sign_up);
router.post('/log-in', indexController.post_log_in);
router.get('/log-out', indexController.get_log_out);

router.get('/', authenticateJWT, (req, res, next) => {
  res.json('Works');
});
module.exports = router;
