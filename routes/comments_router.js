var express = require('express');
var router = express.Router();
const commentController = require('../controllers/comment_controller');
var authenticateJWT = require('../middleware/authenticateJWT');
const authorizeAdmin = require('../middleware/authorizeAdmin');

/* GET home page. */
router.get('/', commentController.get_comments);
router.post('/', authenticateJWT, commentController.post_comment);
router.get('/:id', commentController.get_comment);
router.put(
  '/:id',
  authenticateJWT,
  authorizeAdmin,
  commentController.update_comment
);
router.delete(
  '/:id',
  authenticateJWT,
  authorizeAdmin,
  commentController.delete_comment
);

module.exports = router;
