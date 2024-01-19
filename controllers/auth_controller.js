const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.get_session = [
  (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decodedToken = jwt.decode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeLeft = decodedToken.exp - currentTime; // Time left in seconds

      // Respond with the time left
      res.json({
        message: 'You are signed in.',
        expiresIn: timeLeft > 0 ? `${timeLeft} seconds` : 'Token expired',
        admin: req.user.is_admin,
      });
    } catch (error) {
      res.status(400).json({ error: 'Invalid token' });
    }
  },
];

exports.post_sign_up = [
  body('username', 'username must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('username').custom(async (value) => {
    const user = await User.find({ username: value }).exec();
    if (user.length != 0) throw new Error('username already exists');
  }),
  body('password', 'password must be at least 6 characters long')
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
    return value === req.body.password;
  }),
  body('email', 'email should not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email', 'wrong email format').trim().isEmail().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
        });

        await user.save();
        res.send(user);
        return;
      }
    });
  }),
];

exports.post_log_in = [
  body('username', 'username must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body('password', 'password must be at least 6 characters long')
    .trim()
    .isLength({ min: 6 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send(errors.array());

    const user = await User.find({ username: req.body.username }).exec();
    if (user.length == 0) return res.send('User not found');

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.send('Incorrect Password');
    }

    const token = jwt.sign(
      { username: req.body.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  }),
];

exports.get_log_out = [
  (req, res, next) => {
    // client should delete the token here
    res.send('Logout successfull');
  },
];
