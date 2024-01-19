var express = require('express');
var router = express.Router();
var authenticateJWT = require('../helpers/authenticateJWT');

const indexController = require('../controllers/index_controller');
const jwt = require('jsonwebtoken');
const authorizeAdmin = require('../helpers/authorizeAdmin');

/* GET home page. */
router.post('/sign-up', indexController.post_sign_up);
router.post('/log-in', indexController.post_log_in);
router.get('/log-out', indexController.get_log_out);

router.get('/session', authenticateJWT, authorizeAdmin, (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = jwt.decode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const timeLeft = decodedToken.exp - currentTime; // Time left in seconds

    // Respond with the time left
    res.json({
      message: 'You are signed in.',
      expiresIn: timeLeft > 0 ? `${timeLeft} seconds` : 'Token expired',
      admin: req.user.is_admin,
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
});
module.exports = router;
