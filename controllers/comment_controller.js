const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const Comment = require('../models/comment_model');
const User = require('../models/user_model');
const Post = require('../models/post_model');

exports.get_comments = [
  asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({})
      .sort({ created_at: 1 })
      .populate('author', 'email username is_admin')
      .populate('post', 'title created_at is_published')
      .exec();

    const publishedComments = comments.filter(
      (comment) => comment.post && comment.post.is_published
    );

    res.json(publishedComments);
  }),
];

exports.get_comments_admin = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({})
    .sort({ created_at: 1 })
    .populate('author', 'email username is_admin')
    .populate('post', 'title created_at is_published')
    .exec();

  res.json(comments);
});

exports.get_comment = [
  asyncHandler(async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id).exec();
      res.json(comment);
    } catch (err) {
      return next('Comment not found');
    }
  }),
];

exports.post_comment = [
  body('content', 'Content must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('auhorId', 'Author ID must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('postId', 'Post ID must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.body.authorId).exec();
    const post = await Post.findById(req.body.postId).exec();

    if (!user || !post) {
      const err = new Error('Author user or post id not found');
      err.status = 404;
      return next(err);
    }

    const comment = new Comment({
      content: req.body.content,
      author: req.body.authorId,
      post: req.body.postId,
    });

    const savedComment = await comment.save();
    return res.json(savedComment);
  }),
];

exports.update_comment = [
  body('content', 'Content must not be empty')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('authorId', 'Author ID must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('postId', 'Post ID must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    if (!req.user.is_admin) {
      res.json('You are not an admin');
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedComment = {
      content: req.body.content,
      author: req.body.authorId,
      post: req.body.postId,
    };

    const savedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      updatedComment,
      { new: true }
    ).exec();

    console.log(savedComment);

    if (!savedComment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      const populatedComment = await Comment.findById(savedComment._id)
        .populate('author', 'username email')
        .populate('post', 'title content')
        .exec();

      res.json(populatedComment);
    }
  }),
];

exports.delete_comment = [
  asyncHandler(async (req, res, next) => {
    console.log(req.params.id);
    if (!req.user.is_admin) {
      res.json('You are not an admin');
    }
    try {
      res.json(await Comment.findByIdAndDelete(req.params.id));
    } catch (err) {
      res.json(err);
    }
  }),
];
