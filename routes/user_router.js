var express = require('express');
var router = express.Router();
const userController = require('../controllers/user_controller');
var authenticateJWT = require('../helpers/authenticateJWT');
const authorizeAdmin = require('../helpers/authorizeAdmin');

/* GET home page. */
router.get('/', authenticateJWT, authorizeAdmin, userController.get_users);
router.get('/:id', authenticateJWT, userController.get_user);
router.put('/:id', authenticateJWT, userController.update_user);
router.delete('/:id', authenticateJWT, userController.delete_user);

module.exports = router;
