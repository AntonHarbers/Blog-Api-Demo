const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const Post = require('../models/post_model');

exports.get_posts = [
  asyncHandler(async (req, res, next) => {
    const posts = await Post.find({})
      .populate('author', 'username email')
      .exec();
    res.json(posts);
  }),
];

exports.get_post = [
  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('author').exec();

    if (!post) return res.send('Post with id:' + req.params.id + ' not found!');

    res.json(post);
  }),
];

exports.post_post = [
  body('title', 'Title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('content', 'Content must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('is_published', 'is_published must be a boolean')
    .optional({ checkFalsy: true })
    .isBoolean()
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      ...(req.body.is_published !== undefined && {
        is_published: req.body.is_published,
      }),
      author: req.user.id,
    });

    await post.save();
    res.json(post);
  }),
];

exports.update_post = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.content);
  }),
];

exports.delete_post = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.postId);
  }),
];
