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
      .populate('author', 'email')
      .exec();

    res.json(comments);
  }),
];

exports.get_comment = [
  asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id).exec();

    if (!comment) {
      const err = new Error('Comment not found');
      err.status = 404;
      return next(err);
    }

    res.json(comment);
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
    const user = await User.findById(req.body.auhtorId).exec();
    const post = await Post.findById(req.body.postId).exec();

    if (!user || !post) {
      const err = new Error('Author user or post id not found');
      err.status = 404;
      return next(err);
    }

    const comment = new Comment({
      content: req.body.content,
      author: req.body.auhtorId,
      post: req.body.postId,
    });

    const savedPost = await comment.save();
    return res.json(savedPost);
  }),
];

exports.update_comment = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.author);
  }),
];

exports.delete_comment = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.commentId);
  }),
];
