const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
require('dotenv').config();
const User = require('../models/user_model');

exports.get_sign_up = (req, res, next) => {
  res.send('sign up now');
};

exports.post_sign_up = [
  body('username', 'username should not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'password should be at least 6 characters long')
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body('email', 'email should not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.array());
      return;
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    await user.save();
    res.send(user);
    return;
  }),
];

exports.post_log_in = [asyncHandler(async (req, res, next) => {})];

exports.get_log_out = [asyncHandler(async (req, res, next) => {})];
