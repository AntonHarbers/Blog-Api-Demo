var express = require('express');
var router = express.Router();
const commentController = require('../controllers/comment_controller');
var authenticateJWT = require('../helpers/authenticateJWT');

/* GET home page. */
router.get('/', commentController.get_comments);
router.post('/', authenticateJWT, commentController.post_comment);
router.get('/:id', commentController.get_comment);
router.put('/:id', authenticateJWT, commentController.update_comment);
router.get('/:id', authenticateJWT, commentController.delete_comment);

module.exports = router;
