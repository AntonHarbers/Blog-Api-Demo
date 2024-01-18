var express = require('express');
var router = express.Router();
const userController = require('../controllers/user_controller');

/* GET home page. */
router.get('/', userController.get_users);
router.post('/', userController.post_user);
router.get('/:id', userController.get_user);
router.put('/:id', userController.update_user);
router.get('/:id', userController.delete_user);

module.exports = router;
