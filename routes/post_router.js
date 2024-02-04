var express = require('express');
var router = express.Router();
const postController = require('../controllers/post_controller');
var authenticateJWT = require('../middleware/authenticateJWT');
const authorizeAdmin = require('../middleware/authorizeAdmin');

/* GET home page. */
router.get('/', postController.get_posts);
router.get(
  '/admin',
  authenticateJWT,
  authorizeAdmin,
  postController.get_posts_admin
);
router.post('/', authenticateJWT, authorizeAdmin, postController.post_post);
router.get('/:id', postController.get_post);
router.put('/:id', authenticateJWT, authorizeAdmin, postController.update_post);
router.delete(
  '/:id',
  authenticateJWT,
  authorizeAdmin,
  postController.delete_post
);

module.exports = router;
