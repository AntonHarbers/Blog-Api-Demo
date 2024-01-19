var express = require('express');
var router = express.Router();
const commentController = require('../controllers/comment_controller');
var authenticateJWT = require('../helpers/authenticateJWT');
const authorizeAdmin = require('../helpers/authorizeAdmin');

/* GET home page. */
router.get('/', commentController.get_comments);
router.post('/', commentController.post_comment);
router.get('/:id', commentController.get_comment);
router.put('/:id', commentController.update_comment);
router.get('/:id', commentController.delete_comment);

module.exports = router;
