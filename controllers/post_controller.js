const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const Post = require('../models/post_model');

exports.get_posts = [
  asyncHandler(async (req, res, next) => {
    res.send('All Posts');
  }),
];

exports.get_post = [
  asyncHandler(async (req, res, next) => {
    res.send(req.params.id);
  }),
];

exports.post_post = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.title);
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
