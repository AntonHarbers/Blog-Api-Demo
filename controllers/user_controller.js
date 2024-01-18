const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const Post = require('../models/post_model');

exports.get_users = [
  asyncHandler(async (req, res, next) => {
    res.send('All Users');
  }),
];

exports.get_user = [
  asyncHandler(async (req, res, next) => {
    res.send(req.params.id);
  }),
];

exports.post_user = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.email);
  }),
];

exports.update_user = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.email);
  }),
];

exports.delete_user = [
  asyncHandler(async (req, res, next) => {
    res.send(req.body.userid);
  }),
];
