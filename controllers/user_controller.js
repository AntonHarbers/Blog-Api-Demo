const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

exports.get_users = [
  asyncHandler(async (req, res, next) => {
    if (!req.user.is_admin) return res.send('Not admin');
    const users = await User.find({}).sort('username').exec();
    res.json(users);
  }),
];

exports.get_user = [
  asyncHandler(async (req, res, next) => {
    const paramUser = await User.findById(req.params.id).exec();
    const clientUser = await User.find({ username: req.user.username }).exec();

    if (!clientUser[0].is_admin) {
      if (clientUser[0]._id != paramUser[0]._id)
        return res.send('You are not authorized to get this user info');
    }

    return res.json(paramUser);
  }),
];

exports.update_user = [
  // Add your validation middleware here, e.g., check('email').isEmail()
  body('email', 'Incorrect email format')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .escape(),
  body('password', 'Password must be at least 6 characters long')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body('is_admin', 'Is Admin needs to be a boolean').isBoolean().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const paramUser = await User.findById(req.params.id).exec();
    const clientUser = await User.findOne({
      username: req.user.username,
    }).exec();

    if (paramUser == null) return res.send('User to update not found');
    if (clientUser == null)
      return res.send('User ' + req.user.username + ' not found');

    if (
      !clientUser.is_admin &&
      clientUser._id.toString() !== paramUser._id.toString()
    ) {
      return res
        .status(403)
        .send('You are not authorized to update this user info');
    }

    let updatedData = {};
    if (req.body.username) updatedData.username = req.body.username;
    if (req.body.email) updatedData.email = req.body.email;

    // Only admin can update the is_admin field
    if (clientUser.is_admin && req.body.is_admin !== undefined) {
      updatedData.is_admin = req.body.is_admin;
    } else {
      return res.send('Only an admin can update the admin property');
    }

    // Hash the password if it's provided
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updatedData.password = hashedPassword;
    }

    // Update the user in the database
    await User.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    }).exec();

    return res.send('User updated successfully');
  }),
];

exports.delete_user = [
  asyncHandler(async (req, res, next) => {
    const paramUser = await User.findById(req.params.id).exec();
    const clientUser = await User.find({ username: req.user.username }).exec();

    if (!clientUser[0].is_admin) {
      if (clientUser[0]._id != paramUser[0]._id)
        return res.send('You are not authorized to get this user info');
    }

    await User.findByIdAndDelete(req.params.id).exec();

    // add new user data here

    return res.send('user deleted');
  }),
];
