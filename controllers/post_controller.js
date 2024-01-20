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
  body('title', 'Title must not be empty')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'Content must not be empty')
    .optional()
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
      return res.status(404).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res.status(404).json({ errors: 'Post not found' });
    }

    let updatedPost = {};
    if (req.body.title) updatedPost.title = req.body.title;
    if (req.body.content) updatedPost.content = req.body.content;
    if (req.body.is_published) updatedPost.is_published = req.body.is_published;

    await Post.findByIdAndUpdate(req.params.id, updatedPost, {
      new: true,
    }).exec();

    return res.send('Post updated succesfully');
  }),
];

exports.delete_post = [
  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ errors: 'Post not found' });
    }

    await Post.findByIdAndDelete(req.params.id).exec();

    return res.send('Post deleted');
  }),
];
