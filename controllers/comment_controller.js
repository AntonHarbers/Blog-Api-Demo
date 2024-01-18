const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const Comment = require('../models/comment_model');

exports.get_comments = [
  asyncHandler(async (req, res, next) => {
    res.send('All Comments');
  }),
];

exports.get_comment = [
  asyncHandler(async (req, res, next) => {
    res.send(req.params.id);
  }),
];

exports.post_comment = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.content);
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
